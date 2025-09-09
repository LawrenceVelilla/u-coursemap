import { OpenAI } from 'openai';
import { RawCourse, FinalCourseDetails } from '../db/types';
import { BASE_PROMPT } from './baseprompt';

async function descriptionParser(description: string): Promise<any> {
  const prompt = description
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
        content: BASE_PROMPT
      },
    ],
    temperature: 0,
    response_format: { type: 'json_object' },
  });

  const result = response.choices[0].message.content;

  try {
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
    courseCode: courseToBeParsed.courseCode,
    title: courseToBeParsed.title,
    keywords: parsed.keywords,
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
