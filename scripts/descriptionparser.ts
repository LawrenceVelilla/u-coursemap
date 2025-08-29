import * as cheerio from 'cheerio';
import axios from 'axios';
import { prisma } from '../db/client'; 

async function DescriptionParse() {
  try {

    const departments = await prisma.course.findMany({
      select: {
        department: true,
      },
    });

    const uniqueDepartments = [...new Set(departments.map(d => d.department))];
    
    const BASE_URL = 'https://apps.ualberta.ca/catalogue/course/'

    for (const department of uniqueDepartments) {
      console.log(`Processing department: ${department}`);
      
      try {
        const response = await axios.get(`${BASE_URL}${department.toLowerCase()}`);
        const $ = cheerio.load(response.data);

        const courseDescriptions: { [key: string]: string } = {};
        $('.course').each((_, element) => {
          const $course = $(element);

          const headerText: string = $course.find('h2 a').text().trim().split(' - ')[0]; // Get course code
          const fullDescription: string = $course.find('p').text().trim();
          
          // Split description at prerequisite/corequisite keywords and keep only the first part
          let description = fullDescription.split(/\b(?:prerequisite|corequisite)s?:?/i)[0].trim();
          
          // Remove "See Note" sections
          description = description.split(/see note/i)[0].trim();

          if (headerText && description) {
            courseDescriptions[headerText] = description;
          }
        });

        console.log(`\nFound descriptions for ${department}:`, Object.keys(courseDescriptions).length, 'courses\n');

        // Update each course individually
        for (const [courseCode, description] of Object.entries(courseDescriptions)) {
          try {
            const updateResult = await prisma.course.updateMany({
              where: {
                courseCode: courseCode,
              },
              data: {
                description: description,
              },
            });
            
            console.log(`Updated ${courseCode}: ${updateResult.count} records`);
          } catch (updateError) {
            console.error(`Failed to update ${courseCode}:`, updateError);
          }
        }
      } catch (departmentError) {
        console.error(`Failed to process department ${department}:`, departmentError);
      }
      console.log(`\nFinished processing department: ${department} - waiting 10 seconds before next`);
      await new Promise(resolve => setTimeout(resolve, 1000 * 10));
    }

    console.log('Description update complete');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

await DescriptionParse();