import { prisma } from "@/db/client";

async function getCourseData(courseCode: string) {
  const course = await prisma.course.findUnique({
    where: { code: courseCode },
  });
  return course;
}



