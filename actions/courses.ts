"use server";
import { prisma } from "../db/client";

export async function getCourseDetails(
  code: string
): Promise<any> {
  try {
    const parts = code.toUpperCase().trim().split(" ");
    if (parts.length < 2) {
      throw new Error("Invalid course code format. Use format: DEPT ### or DEPT PART ###");
    }

    // Everything before the number is considered the department
    const department = parts.slice(0, -1).join(" ");

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