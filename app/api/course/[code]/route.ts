import { prisma } from '@/db/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    const courseCode = params.code;
    const department = courseCode.split(' ').slice(0, -1).join(' ');
    try {
        const course = await prisma.course.findUnique({
            where: {
                department_courseCode_unique: {
                    department: department,
                    courseCode: courseCode
                },
            },
        });      
        return NextResponse.json(course);
    } catch (error) {
        console.error("Error fetching course:", error);
        return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 });
    }
}