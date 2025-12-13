package com.ucourse.map.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * POJO representing the units JSONB field in the Course table.
 * Maps to: { "credits": 3, "feeIndex": 6, "term": "Fall/Winter" }
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Units {
    private Integer credits;
    private Integer feeIndex;
    private String term;
}
