import { OpenAI } from 'openai';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const BASEPROMPT = `
You are a helpful assistant that extracts structured course information from university course catalog descriptions.
Your task is to analyze the provided text and extract:
2.  A structured representation of prerequisites (tagged as "Prerequisites", "Prereq", or "prereq").
3.  A structured representation of corequisites (tagged as "Corequisites", "Coreq", or "coreq").
4.  Any additional notes (often appearing after prerequisites/corequisites or marked as "Note:").

Output Rules:
- The output MUST be a single JSON object. Do not include any text before or after the JSON object.
- Your main objective is to extract the requirements and notes from the course description.
- Prerequisites and corequisites can be complex and may involve multiple courses, conditions, or combinations of courses. Watch out for indicators like "Prerequisites:", "Corequsites:" which indicate the start of these reflective requirements.
    - If "Prequisites:" is not mentioned/found, assume there are no prerequisites.
    - If "Corequisites:" is not mentioned/found, assume there are no corequisites
- Use the operators: "AND", "OR", "STANDALONE", "WILDCARD".
- "STANDALONE" is for a single course requirement (e.g., "CMPUT 272"). Represent as: { "operator": "STANDALONE", "courses": ["CMPUT 272"] }
- "OR" is for a choice between multiple courses (e.g., "one of MATH 100, 114, 117"). Represent as: { "operator": "OR", "courses": ["MATH 100", "MATH 114", "MATH 117"] }. Conditions can be nested (e.g., an OR containing ANDs or ORs).
    - There are conditions like this too. "PHYSL 210 or 212 or 214" should be represented as: { "operator": "OR", "courses": ["PHYSL 210", "PHYSL 212", "PHYSL 214"] }.
- "AND" is for multiple conditions that must *all* be met. Represent as: { "operator": "AND", "conditions": [ <list of requirement objects> ] }. Conditions can be nested (e.g., an AND containing ORs or ANDs).
    - There are conditions like this too. "One of CMPUT 272, 275; One of CMPUT 174, 274" should be represented as: { "operator": "AND", "conditions": [ { "operator": "OR", "courses": ["CMPUT 272", "CMPUT 275"] }, { "operator": "OR", "courses": ["CMPUT 174", "CMPUT 274"] } ] }.
- For requirements like "any 300-level Computing Science course", use "WILDCARD". Represent as: { "operator": "WILDCARD", "pattern": "CMPUT 3[0-9]{2}", "description": "any 300-level Computing Science course" } (Add a human-readable description).
- If there are no nested conditions, dont use "conditions" in the JSON. Just use "courses" directly.
    - For example, "CMPUT 174 or 274" should be represented as: { "operator": "OR", "courses": ["CMPUT 174", "CMPUT 274"] }.
    - Another example, "One of CMPUT 272, 272, 275" should be represented as: { "operator": "OR", "courses": ["CMPUT 272", "CMPUT 275"] }.
    - Another example, "CMPUT 200 and CMPUT 201" should be represented as: { "operator": "AND", "courses": ["CMPUT 200", "CMPUT 201"] }.
- If there are nested conditions, use "conditions" to represent them. For example, "CMPUT 174 or 274 or MATH 100 or 114" should be represented as: { "operator": "OR", "conditions": [ { "operator": "OR", "courses": ["CMPUT 174", "CMPUT 274"] }, { "operator": "OR", "courses": ["MATH 100", "MATH 114"] } ] }.
- If no prerequisites are found, use: { "operator": "AND", "conditions": [] }
- If no corequisites are found, use: { "operator": "AND", "conditions": [] }
- Flatten the prerequisites and corequisites and make new "flattenedPrerequisites" and "flattenedCorequisites" arrays.
    - If there are no prerequisites, set "flattenedPrerequisites" to an empty array.
    - If there are no corequisites, set "flattenedCorequisites" to an empty
- Capture any remaining relevant text (often credit restrictions, recommendations, or notes) in the "notes" field.
- The output should be a valid JSON object. If the JSON is malformed, return null.

Example 1:
Input:
    This course introduces the fundamental statistical, mathematical, and computational concepts in analyzing data. The goal for this introductory course is to provide a solid foundation in the mathematics of machine learning, in preparation for more advanced machine learning concepts. The course focuses on univariate models, to simplify some of the mathematics and emphasize some of the underlying concepts in machine learning, including: how should one think about data, how can data be summarized, how models can be estimated from data, what sound estimation principles look like, how generalization is achieved, and how to evaluate the performance of learned models. Prerequisites: CMPUT 174 or 274; one of MATH 100, 114, 117, 134, 144, or 154. Corequisites: CMPUT 175 or 275; CMPUT 272; MATH 102, 125 or 127; one of STAT 151, 161, 181, 235, 265, SCI 151, or MATH 181.
Output:
    {
      "requirements": {
        "prerequisites": {
          "operator": "AND",
          "conditions": [
            { "operator": "OR", "courses": ["CMPUT 174", "CMPUT 274"] },
            { "operator": "OR", "courses": ["MATH 100", "MATH 114", "MATH 117", "MATH 134", "MATH 144", "MATH 154"] }
          ]
        },
        "corequisites": {
          "operator": "AND",
          "conditions": [
            { "operator": "OR", "courses": ["CMPUT 175", "CMPUT 275"] },
            { "operator": "STANDALONE", "courses": ["CMPUT 272"] },
            { "operator": "OR", "courses": ["MATH 102", "MATH 125", "MATH 127"] },
            { "operator": "OR", "courses": ["STAT 151", "STAT 161", "STAT 181", "STAT 235", "STAT 265", "SCI 151", "MATH 181"] }
          ]
        },
        "notes": ""
      },
      "flattenedPrerequisites": ["CMPUT 174", "CMPUT 274", "MATH 100", "MATH 114", "MATH 117", "MATH 134", "MATH 144", "MATH 154"],
      "flattenedCorequisites": ["CMPUT 175", "CMPUT 275", "CMPUT 272", "MATH 102", "MATH 125", "MATH 127", "STAT 151", "STAT 161", "STAT 181", "STAT 235", "STAT 265", "SCI 151", "MATH 181"]
    }`;

interface FinalCourseDetails {
  department: string;
  courseCode: string;
  title: string;
  units: {
    credits: number;
    feeIndex: number;
    term: string;
  };
  requirements: RequirementsData;
  flattenedPrerequisites: string[];
  flattenedCorequisites: string[];
  url: string | null;
  updatedAt: string; // ISO String date
}

interface RequirementsData {
  prerequisites?: RequirementCondition;
  corequisites?: RequirementCondition;
  notes?: string | null;
}

interface RequirementCondition {
  // Operator might need more values if you use 'STANDALONE', 'WILDCARD', etc.
  operator: 'AND' | 'OR' | 'STANDALONE' | 'WILDCARD' | string;
  conditions?: RequirementCondition[];
  courses?: string[];
  pattern?: string;
  description?: string;
}

interface RawCourse {
  department: string;
  code: string;
  title: string;
  units: {
    credits: number;
    feeIndex: number;
    term: string;
  };
  description: string;
  url: string;
}

async function descriptionParser(description: string): Promise<any> {
  const prompt = `${BASEPROMPT}\n${description}`;
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
      {
        role: 'system',
        content:
          'You are a helpful assistant that extracts structured course information from university course catalog descriptions.',
      },
    ],
    temperature: 0,
    response_format: { type: 'json_object' },
  });

  const result = response.choices[0].message.content;

  try {
    // JSON.parse cannot take in null values so check if null first
    if (result === null) {
      console.error('Null result');
      return null;
    }

    const parsedResult = JSON.parse(result);

    if (typeof parsedResult === 'object' && parsedResult !== null) {
      return parsedResult;
    } else {
      console.error('Parsed result is not a valid JSON object:', parsedResult);
      return null;
    }
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
}

export async function processCourse(rawCourse: RawCourse): Promise<any> {
  const courseToBeParsed = rawCourse;
  const parsed = await descriptionParser(courseToBeParsed.description);
  if (parsed === null) {
    return null;
  }

  const finalDetails = {
    department: courseToBeParsed.department,
    courseCode: courseToBeParsed.code,
    title: courseToBeParsed.title,
    units: courseToBeParsed.units,
    requirements: parsed.requirements,
    flattenedPrerequisites: parsed.flattenedPrerequisites || [],
    flattenedCorequisites: parsed.flattenedCorequisites || [],
    url: courseToBeParsed.url || null,
    updatedAt: new Date().toISOString(),
  } as FinalCourseDetails;
  return finalDetails;
}

export async function processDepartment(
  rawCourses: RawCourse[]
): Promise<FinalCourseDetails[]> {
  let processedCourses: FinalCourseDetails[] = [];

  for (const course of rawCourses) {
    const parsed = await processCourse(course);
    if (parsed === null) {
      return [];
    }
    processedCourses.push(parsed);
  }
  return processedCourses;
}

async function main() {
  const test_course: RawCourse[] = [
    {
      department: 'CMPUT',
      code: '204',
      title: 'Algorithms I',
      units: {
        credits: 3,
        feeIndex: 6,
        term: 'Fall',
      },
      description:
        'The first of two courses on algorithm design and analysis, with emphasis on fundamentals of searching, sorting, and graph algorithms. Examples include divide and conquer, dynamic programming, greedy methods, backtracking, and local search methods, together with analysis techniques to estimate program efficiency. Prerequisites: CMPUT 175 or 275, and CMPUT 272; and one of MATH 100, 114, 117, 134, 144, or 154.',
      url: '/catalogue/course/cmput/204',
    },
    {
      department: 'CMPUT',
      code: '272',
      title: 'Formal Systems and Logic in Computing Science',
      units: {
        credits: 3,
        feeIndex: 6,
        term: 'Fall',
      },
      description:
        'An introduction to the tools of set theory, logic, and induction, and their use in the practice of reasoning about algorithms and programs. Basic set theory; the notion of a function; counting; propositional and predicate logic and their proof systems; inductive definitions and proofs by induction; program specification and correctness. Prerequisites: CMPUT 101, 174, 175, 274, SCI 100, or ENCMP 100.',
      url: '/catalogue/course/cmput/272',
    },
  ];
  const result = await processDepartment(test_course);

  console.log(result);
}

main();
