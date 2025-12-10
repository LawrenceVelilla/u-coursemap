import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { CourseCard } from "./CourseCard";

interface CanvasProps {
  courses: string[];
  onRemoveCourse: (courseCode: string) => void;
}

export function Canvas({ courses, onRemoveCourse }: CanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
    data: {
      type: "canvas",
      accepts: ["course"],
    },
  });

  const isEmpty = courses.length === 0;

  return (
    <div className="w-full mb-6">
      <div className="mb-3">
        <h2 className="text-xl font-bold dark:text-primary">
          Canvas
        </h2>
        <p className="text-sm dark:text-primary font-light">
          Added Courses will be here
        </p>
      </div>

      <div
        ref={setNodeRef}
        className={`
          w-full min-h-[150px] p-4 rounded-lg border-2 frosted-glass
          transition-all
          ${isOver ? "border-secondary dark:border-secondary bg-secondary/5 dark:bg-secondary/10 shadow-lg" : ""}
        `}
      >
        {isEmpty ? (
          <div className="flex items-center justify-center h-[120px] text-gray-400 dark:text-gray-500">
            <div className="text-center">
              <p className="text-lg font-medium">No courses yet</p>
              <p className="text-sm">Search and add courses to get started</p>
            </div>
          </div>
        ) : (
          <SortableContext items={courses} strategy={rectSortingStrategy}>
            <div className="flex flex-wrap gap-3">
              {courses.map((courseCode) => (
                <CourseCard
                  key={courseCode}
                  courseCode={courseCode}
                  onRemove={() => onRemoveCourse(courseCode)}
                />
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
}
