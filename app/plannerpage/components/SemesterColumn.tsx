import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CourseCard } from "./CourseCard";

interface SemesterColumnProps {
  id: string;
  label: string;
  courses: string[];
  maxCourses?: number;
  onRemoveCourse: (courseCode: string) => void;
}

export function SemesterColumn({
  id,
  label,
  courses,
  maxCourses = 5,
  onRemoveCourse,
}: SemesterColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: "semester",
      accepts: ["course"],
    },
  });

  const isFull = courses.length >= maxCourses;
  const isEmpty = courses.length === 0;

  return (
    <div
      ref={setNodeRef}
      className={`
        flex flex-col flex-1 min-h-[300px] p-4 rounded-lg border-2
        transition-all dark:frosted-glass bg-none
        ${isOver && !isFull ? "border-secondary dark:border-secondary bg-secondary/5 dark:bg-secondary/10 shadow-lg" : ""}
        ${isFull ? "border-red-400 dark:border-red-500 bg-red-50/30 dark:bg-red-900/20 shadow-md" : ""}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-300 dark:border-gray-600">
        <h3 className="font-bold text-gray-900 dark:text-gray-100">{label}</h3>
        <span
          className={`
            text-sm font-medium px-2 py-1 rounded
            ${isFull ? "bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}
          `}
        >
          {courses.length}/{maxCourses}
        </span>
      </div>

      {/* Course List */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {isEmpty ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
            Drop courses here
          </div>
        ) : (
          <SortableContext items={courses} strategy={verticalListSortingStrategy}>
            {courses.map((courseCode) => (
              <CourseCard
                key={courseCode}
                courseCode={courseCode}
                onRemove={() => onRemoveCourse(courseCode)}
              />
            ))}
          </SortableContext>
        )}
      </div>

      {/* Full Indicator */}
      {isFull && (
        <div className="mt-2 text-xs text-red-600 dark:text-red-400 text-center font-medium">
          Semester Full
        </div>
      )}
    </div>
  );
}
