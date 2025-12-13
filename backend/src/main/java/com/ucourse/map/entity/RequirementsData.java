package com.ucourse.map.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * POJO representing the requirements JSONB field in the Course table.
 * Contains prerequisites, corequisites, and notes.
 *
 * Example:
 * {
 *   "prerequisites": { "operator": "AND", "courses": [...] },
 *   "corequisites": { "operator": "OR", "courses": [...] },
 *   "notes": "May require departmental approval"
 * }
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequirementsData {
    /**
     * Prerequisite requirements (can be null)
     */
    private RequirementCondition prerequisites;

    /**
     * Corequisite requirements (can be null)
     */
    private RequirementCondition corequisites;

    /**
     * Additional notes about requirements
     */
    private String notes;
}
