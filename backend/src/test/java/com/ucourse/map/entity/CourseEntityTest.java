package com.ucourse.map.entity;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Integration test for Course entity mapping.
 * Tests against 3 known courses from the database with exact expected values.
 */
@SpringBootTest
@Transactional
public class CourseEntityTest {

    @PersistenceContext
    private EntityManager entityManager;

    @Test
    public void testThreeSpecificCoursesWithKnownData() {
        System.out.println("\n=== Testing 3 Specific Courses with Known Data ===\n");

        // Test 1: CMPUT 174 - Intro course with high school prerequisites
        testCourse("CMPUT", "CMPUT 174",
            "Introduction to the Foundations of Computation I",
            3, // expected credits
            "EITHER, 3-0-3", // expected term
            new String[]{"Math 30", "Math 30-1", "Math 30-2"}, // high school prereqs
            new String[]{}, // no corequisites
            new String[]{"Computing Science", "Problem-Driven Approach", "Data Structures",
                        "Recursion", "Programming", "Text Analysis"}); // keywords

        // Test 2: CMPUT 200 - Ethics course with complex OR prerequisites
        testCourse("CMPUT", "CMPUT 200",
            "Ethics of Data Science and Artificial Intelligence",
            3, // expected credits
            "EITHER, 3-0-3", // expected term
            new String[]{"CMPUT 191", "CMPUT 195", "CMPUT 174", "CMPUT 274",
                        "STAT 151", "STAT 161", "STAT 181", "STAT 235", "STAT 265",
                        "SCI 151", "MATH 181", "CMPUT 267"}, // prerequisites
            new String[]{}, // no corequisites
            new String[]{"Ethics", "Artificial Intelligence", "Data Science",
                        "Privacy", "Fairness", "Bias", "Explainability"}); // keywords

        // Test 3: CMPUT 204 - Algorithms course with multiple AND prerequisites
        testCourse("CMPUT", "CMPUT 204",
            "Algorithms I",
            3, // expected credits
            "Fall", // expected term
            new String[]{"CMPUT 175", "CMPUT 275", "CMPUT 272",
                        "MATH 100", "MATH 114", "MATH 117", "MATH 134", "MATH 144", "MATH 154"},
            new String[]{}, // no corequisites
            new String[]{"Algorithm Design", "Searching", "Sorting",
                        "Graph Algorithms", "Dynamic Programming"}); // keywords

        System.out.println("=== All 3 courses tested successfully! ===\n");
    }

    private void testCourse(String expectedDept, String expectedCode, String expectedTitle,
                           Integer expectedCredits, String expectedTerm,
                           String[] expectedPrereqs, String[] expectedCoreqs,
                           String[] expectedKeywords) {

        System.out.println("Testing: " + expectedCode);

        // Query the course
        List<Course> courses = entityManager
            .createQuery("SELECT c FROM Course c WHERE c.department = :dept AND c.courseCode = :code", Course.class)
            .setParameter("dept", expectedDept)
            .setParameter("code", expectedCode)
            .setMaxResults(1)
            .getResultList();

        assertFalse(courses.isEmpty(), "Course " + expectedCode + " should exist in database");
        Course course = courses.get(0);

        // Test 1: Basic Fields
        assertEquals(expectedDept, course.getDepartment(), "Department should match");
        assertEquals(expectedCode, course.getCourseCode(), "Course code should match");
        assertEquals(expectedTitle, course.getTitle(), "Title should match");
        assertNotNull(course.getId(), "Course ID should not be null");
        assertNotNull(course.getUpdatedAt(), "UpdatedAt should not be null");

        System.out.println("Basic fields: " + course.getTitle());

        // Test 2: Units JSONB Field
        assertNotNull(course.getUnits(), "Units JSONB should not be null");
        Units units = course.getUnits();
        assertEquals(expectedCredits, units.getCredits(), "Credits should match");
        assertEquals(expectedTerm, units.getTerm(), "Term should match");
        assertNotNull(units.getFeeIndex(), "Fee index should not be null");

        System.out.println("Units JSONB: " + units.getCredits() + " credits, " + units.getTerm());

        // Test 3: Prerequisites Array (PostgreSQL text[])
        if (expectedPrereqs.length > 0) {
            assertNotNull(course.getFlattenedPrerequisites(),
                "Flattened prerequisites should not be null");
            assertEquals(expectedPrereqs.length, course.getFlattenedPrerequisites().size(),
                "Prerequisites count should match");

            for (String prereq : expectedPrereqs) {
                assertTrue(course.getFlattenedPrerequisites().contains(prereq),
                    "Should contain prerequisite: " + prereq);
            }
            System.out.println("Prerequisites array: " + course.getFlattenedPrerequisites().size() + " items");
        } else {
            assertTrue(course.getFlattenedPrerequisites() == null ||
                       course.getFlattenedPrerequisites().isEmpty(),
                "Should have no prerequisites");
            System.out.println("Prerequisites: empty (as expected)");
        }

        // Test 4: Corequisites Array
        if (expectedCoreqs.length > 0) {
            assertNotNull(course.getFlattenedCorequisites(),
                "Flattened corequisites should not be null");
            assertEquals(expectedCoreqs.length, course.getFlattenedCorequisites().size(),
                "Corequisites count should match");
        } else {
            assertTrue(course.getFlattenedCorequisites() == null ||
                       course.getFlattenedCorequisites().isEmpty(),
                "Should have no corequisites");
            System.out.println("Corequisites: empty (as expected)");
        }

        // Test 5: Keywords Array
        assertNotNull(course.getKeywords(), "Keywords should not be null");
        assertEquals(expectedKeywords.length, course.getKeywords().size(),
            "Keywords count should match");

        for (String keyword : expectedKeywords) {
            assertTrue(course.getKeywords().contains(keyword),
                "Should contain keyword: " + keyword);
        }
        System.out.println("Keywords array: " + course.getKeywords().size() + " items");

        // Test 6: Requirements JSONB Field
        assertNotNull(course.getRequirements(), "Requirements JSONB should not be null");
        RequirementsData requirements = course.getRequirements();

        if (expectedPrereqs.length > 0) {
            assertNotNull(requirements.getPrerequisites(),
                "Should have prerequisite structure");
            assertNotNull(requirements.getPrerequisites().getOperator(),
                "Prerequisite operator should not be null");
            System.out.println("Requirements JSONB: operator = " +
                requirements.getPrerequisites().getOperator());
        }

        System.out.println();
    }
}
