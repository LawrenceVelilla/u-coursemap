import { prisma } from '../db/client';
import { processCourse } from './dataparser';
import { RawCourse, FinalCourseDetails } from '../db/types';

async function saveCourseDetails(): Promise<boolean> {
    const testcourse: RawCourse = {
        
      department: 'CMPUT',
      courseCode: 'CMPUT 204',
      title: 'Algorithms I',
      units: {
        credits: 3,
        feeIndex: 6,
        term: 'Fall',
      },
      description:
        'The first of two courses on algorithm design and analysis, with emphasis on fundamentals of searching, sorting, and graph algorithms. Examples include divide and conquer, dynamic programming, greedy methods, backtracking, and local search methods, together with analysis techniques to estimate program efficiency. Prerequisites: CMPUT 175 or 275, and CMPUT 272; and one of MATH 100, 114, 117, 134, 144, or 154.',
      url: '/catalogue/course/cmput/204',
    }

    let parsed: FinalCourseDetails = await processCourse(testcourse);
    if (!parsed) {
      throw new Error('Failed to parse course data');
    }
    parsed.updatedAt = new Date().toISOString();

    let courseToSave = {
        department: parsed.department,
        courseCode: parsed.courseCode,
        title: parsed.title,
        units: parsed.units,
        keywords: parsed.keywords,
        requirements: JSON.parse(JSON.stringify(parsed.requirements)),
        flattenedPrerequisites: parsed.flattenedPrerequisites,
        flattenedCorequisites: parsed.flattenedCorequisites,
        url: testcourse.url || null
    }

    // Save the course to the database
    console.log('Attempting to save course:', courseToSave.department, courseToSave.courseCode);
    
    const result = await prisma.course.upsert({
      where: {
        department_courseCode_unique: {
          department: courseToSave.department,
          courseCode: courseToSave.courseCode,
        },
      },
      update: courseToSave,
      create: courseToSave,
    });
    
    console.log('Database operation completed. Course ID:', result.id);
    console.log('Updated at:', result.updatedAt);
    
    const verified = await prisma.course.findUnique({
      where: {
        department_courseCode_unique: {
          department: 'CMPUT',
          courseCode: 'CMPUT 204'
        }
      }
    });
    
    console.log('Verification check:');
    console.log('Title:', verified?.title);
    console.log('UpdatedAt from DB:', verified?.updatedAt);
    
    return true;
}

saveCourseDetails().catch(console.error);