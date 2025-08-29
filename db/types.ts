export interface RequirementsData {
  prerequisites?: RequirementCondition;
  corequisites?: RequirementCondition;
  notes?: string;
}

export interface RequirementCondition {
  operator: 'AND' | 'OR' | 'STANDALONE' | 'WILDCARD' | string;
  conditions?: RequirementCondition[];
  courses?: string[];
  pattern?: string;
  description?: string;
}

export interface RawCourse {
  department: string;
  courseCode: string;
  title: string;
  units: {
    credits: number;
    feeIndex: number;
    term: string;
  };
  description: string;
  url: string;
}

export interface FinalCourseDetails {
  department: string;
  description: string;
  courseCode: string;
  title: string;
  keywords?: string[];
  units: {
    credits: number;
    feeIndex: number;
    term: string;
  };
  requirements: RequirementsData;
  flattenedPrerequisites: string[];
  flattenedCorequisites: string[];
  url: string | null;
  updatedAt: string; 
}