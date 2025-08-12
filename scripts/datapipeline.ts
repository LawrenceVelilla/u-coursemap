import { scrapeCoursePage } from './coursescraper';
import { processCourse } from './dataparser';
import { save } from './save';
import { prisma } from '../db/client';
import { RawCourse, FinalCourseDetails } from '@/db/types';

const baseURL = "https://apps.ualberta.ca/catalogue/course/";

async function saveCourse(course: string) {
    const courseURL = `${baseURL}${course.toLowerCase()}`;
    console.log(`Processing course: ${courseURL}`);
    
    try {
        const rawCourse = await scrapeCoursePage(courseURL);
        if (!rawCourse || rawCourse.length === 0) {
            console.error(`No courses found at ${courseURL}`);
            return;
        }
        console.log(`Found ${rawCourse.length} raw courses`);
        
        let processedCourses: FinalCourseDetails[] = [];
        let test = rawCourse.slice(0, 15);
        for (const course of test) {
            console.log(`Processing course: ${course.department} ${course.courseCode}`);
            const processedCourse = await processCourse(course);
            if (!processedCourse) {
                console.error(`Failed to process course: ${course.department} ${course.courseCode}`);
                return;
            }
            console.log(`Successfully processed: ${processedCourse.department} ${processedCourse.courseCode}`);
            processedCourses.push(processedCourse);
        }
        console.log(`Processed ${processedCourses.length} courses from ${course}`);
    
        for (const course of processedCourses) {
            const success = await save(course);
            if (!success) {
                console.error(`Failed to save course: ${course.title}`);
            }
            console.log(`Successfully saved course: ${course.title}`);
        }
    

    } catch (error) {
        console.error(`Error saving course ${course}:`, error);
    }

}

async function main() {
    const departments = "biol"
    const save = await saveCourse(departments);
    await prisma.$disconnect();
}
main();