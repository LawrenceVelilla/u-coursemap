package com.ucourse.map.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * JPA Entity representing the courses table in PostgreSQL.
 * Includes JSONB fields and PostgreSQL array types.
 */
@Entity
@Table(name = "courses", uniqueConstraints = {
    @UniqueConstraint(name = "department_courseCode_unique",
                      columnNames = {"department", "courseCode"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "\"id\"", updatable = false, nullable = false, columnDefinition = "UUID")
    private UUID id;

    @Column(name = "\"department\"", nullable = false)
    private String department;

    @Column(name = "\"courseCode\"", nullable = false)
    private String courseCode;

    @Column(name = "\"title\"", nullable = false)
    private String title;

    /**
     * JSONB field for units information
     * Example: { "credits": 3, "feeIndex": 6, "term": "Fall/Winter" }
     */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "\"units\"", columnDefinition = "jsonb")
    private Units units;

    /**
     * JSONB field for complex prerequisites/corequisites
     * Contains nested requirement conditions
     */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "\"requirements\"", columnDefinition = "jsonb")
    private RequirementsData requirements;

    /**
     * PostgreSQL text[] array for flattened prerequisite course codes
     * Example: ["CMPUT 174", "MATH 125"]
     */
    @Column(name = "\"flattenedPrerequisites\"", columnDefinition = "text[]")
    private List<String> flattenedPrerequisites;

    /**
     * PostgreSQL text[] array for flattened corequisite course codes
     */
    @Column(name = "\"flattenedCorequisites\"", columnDefinition = "text[]")
    private List<String> flattenedCorequisites;

    /**
     * PostgreSQL text[] array for search keywords
     */
    @Column(name = "\"keywords\"", columnDefinition = "text[]")
    private List<String> keywords;

    @Column(name = "\"url\"")
    private String url;

    @Column(name = "\"description\"", columnDefinition = "TEXT")
    private String description;

    /**
     * Auto-updated timestamp (TIMESTAMPTZ in PostgreSQL)
     */
    @UpdateTimestamp
    @Column(name = "\"updatedAt\"", nullable = false, columnDefinition = "TIMESTAMPTZ")
    private Instant updatedAt;
}
