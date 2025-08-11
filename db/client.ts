import { PrismaClient } from './generated/prisma';
import dotenv from 'dotenv';


dotenv.config({ path: '.env' });

export const prisma = new PrismaClient();

// Test function
async function testPrismaAccess() {
  try {
    console.log('Testing Prisma access...');
    const course = await prisma.course.findUnique({
      where: { 
        department_courseCode_unique: {
          department: 'CMPUT',
          courseCode: 'CMPUT 200'
        }
      },
    });

    if (course) {
      console.log('Found course:', course.courseCode, '-', course.title);
      console.log('Department:', course.department);
      console.log('Prerequisites:', course.flattenedPrerequisites);
    } else {
      console.log('Course not found');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// testPrismaAccess();
