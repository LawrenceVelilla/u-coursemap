import React from "react";
import { SemesterColumn } from "./SemesterColumn";

export type SemesterId =
  | "year1_fall"
  | "year1_spring"
  | "year2_fall"
  | "year2_spring"
  | "year3_fall"
  | "year3_spring"
  | "year4_fall"
  | "year4_spring";

export type ScheduleData = Record<SemesterId, string[]>;

interface ScheduleBoardProps {
  schedule: ScheduleData;
  onRemoveCourse: (semesterId: SemesterId, courseCode: string) => void;
}

const SEMESTER_CONFIG: Array<{
  year: number;
  semesters: Array<{ id: SemesterId; label: string }>;
}> = [
  {
    year: 1,
    semesters: [
      { id: "year1_fall", label: "Fall" },
      { id: "year1_spring", label: "Winter" },
    ],
  },
  {
    year: 2,
    semesters: [
      { id: "year2_fall", label: "Fall" },
      { id: "year2_spring", label: "Winter" },
    ],
  },
  {
    year: 3,
    semesters: [
      { id: "year3_fall", label: "Fall" },
      { id: "year3_spring", label: "Winter" },
    ],
  },
  {
    year: 4,
    semesters: [
      { id: "year4_fall", label: "Fall" },
      { id: "year4_spring", label: "Winter" },
    ],
  },
];

export function ScheduleBoard({ schedule, onRemoveCourse }: ScheduleBoardProps) {
  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-primary">
          4-Year Schedule
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Drag courses from canvas to plan your semesters (max 5 per semester)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SEMESTER_CONFIG.map(({ year, semesters }) => (
          <div key={year} className="space-y-4 frosted-glass p-4 rounded-lg border border-gray-200">
            {/* Year Header */}
            <h3 className="text-lg font-bold text-gray-800 dark:text-primary border-b-2 border-gray-300 pb-2">
              Year {year}
            </h3>

            {/* Semester Columns */}
            <div className="flex gap-4">
              {semesters.map(({ id, label }) => (
                <SemesterColumn
                  key={id}
                  id={id}
                  label={label}
                  courses={schedule[id]}
                  onRemoveCourse={(courseCode) => onRemoveCourse(id, courseCode)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
