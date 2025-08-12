import { prisma } from '../db/client';
import { FinalCourseDetails } from '../db/types';

export async function save(course: FinalCourseDetails): Promise<boolean> {
    course.updatedAt = new Date().toISOString();

    let courseToSave = {
        department: course.department,
        courseCode: course.courseCode,
        title: course.title,
        units: course.units,
        keywords: course.keywords,
        requirements: JSON.parse(JSON.stringify(course.requirements)),
        flattenedPrerequisites: course.flattenedPrerequisites,
        flattenedCorequisites: course.flattenedCorequisites,
        url: course.url || null
    }

    
    console.log('Attempting to save course:', courseToSave.department, courseToSave.courseCode);
    try {
      const result = await prisma.course.upsert({
        where: {
          department_courseCode_unique: {
            department: courseToSave.department,
            courseCode: courseToSave.courseCode,
          },
      },
      update: courseToSave,
      create: courseToSave,
      })
    console.log('Course saved:', result.department, result.courseCode);
    } catch (error) {
      console.error('Error saving course:', error);
      return false;
    }  
    return true;
}
