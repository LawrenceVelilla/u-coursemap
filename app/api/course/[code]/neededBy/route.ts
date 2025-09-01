import { prisma } from '@/db/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code: courseCode } = await params;

    try {
        const normalizedCourseCode = courseCode.toUpperCase().trim();

        const prerequisite = prisma.course.findMany({
            where: {
                flattenedPrerequisites: {
                    has: normalizedCourseCode
                }
            },
            select: {
                courseCode: true,
                title: true,
                department: true,
                keywords: true,
                units: true
            }
        });

        const corequisite = prisma.course.findMany({
            where: {
                flattenedCorequisites: {
                    has: normalizedCourseCode
                }
            },
            select: {
                courseCode: true,
                title: true,
                department: true,
                keywords: true,
                units: true
            }
        });

        const [prerequisiteCourses, corequisiteCourses] = await Promise.all([
            prerequisite,
            corequisite
        ]);
            return NextResponse.json({
            prerequisites: prerequisiteCourses,
            corequisites: corequisiteCourses
        });
        
    } catch (error) {
        console.error("Error fetching courses needing:", error);
        return NextResponse.json(
            { error: 'Failed to fetch courses needing' }, 
            { status: 500 }
        );
    }
}