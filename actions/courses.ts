"use server";
import { prisma } from "../db/client";

export async function getCourseDetails(
  code: string
): Promise<any> {
  try {
    const parts = code.toUpperCase().trim().split(" ");
    if (parts.length !== 2) {
      throw new Error("Invalid course code format. Use format: DEPT ###");
    }

    const department = parts[0];
    
    const course = await prisma.course.findUnique({
      where: {
        department_courseCode_unique: {
          department: department,
          courseCode: code
        },
      },
    });
    if (!course) {
      throw new Error("Course not found");
    }
    await prisma.$disconnect();
    return course;
    
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw new Error("Failed to fetch course details");
  }
  
}

// async function test() {
//   const course = await getCourseDetails("CMPUT 200");
//   console.log(`Course Details: ${course.department}\n ${course.courseCode}\n ${course.flattenedPrerequisites}`);
// }

// test()
//   .then(() => console.log("Test completed successfully"))
//   .catch((error) => console.error("Test failed:", error));      