package com.ucourse.map.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * POJO representing a requirement condition in the requirements JSONB field.
 * This is a recursive structure that can contain nested conditions.
 *
 * Example:
 * {
 *   "operator": "AND",
 *   "conditions": [
 *     { "operator": "STANDALONE", "courses": ["CMPUT 174"] },
 *     { "operator": "OR", "courses": ["MATH 125", "MATH 127"] }
 *   ]
 * }
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequirementCondition {
    /**
     * Operator type: "AND", "OR", "STANDALONE", "WILDCARD"
     */
    private String operator;

    /**
     * Nested conditions (recursive structure)
     */
    private List<RequirementCondition> conditions;

    /**
     * List of course codes required
     */
    private List<String> courses;

    /**
     * Pattern for wildcard matching (e.g., "CMPUT 3**")
     */
    private String pattern;

    /**
     * Human-readable description of the requirement
     */
    private String description;
}
