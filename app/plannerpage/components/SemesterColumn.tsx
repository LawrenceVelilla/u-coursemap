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
        flex flex-col w-64 min-h-[300px] p-4 rounded-lg border-2
        transition-all frosted-glass
        ${isOver && !isFull ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300" : "border-gray-300 bg-gray-50"}
        ${isFull ? "border-red-300 bg-red-50" : ""}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-300">
        <h3 className="font-bold text-gray-800">{label}</h3>
        <span
          className={`
            text-sm font-medium px-2 py-1 rounded
            ${isFull ? "bg-red-200 text-red-800" : "bg-gray-200 text-gray-600"}
          `}
        >
          {courses.length}/{maxCourses}
        </span>
      </div>

      {/* Course List */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {isEmpty ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
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
        <div className="mt-2 text-xs text-red-600 text-center font-medium">
          Semester Full
        </div>
      )}
    </div>
  );
}
