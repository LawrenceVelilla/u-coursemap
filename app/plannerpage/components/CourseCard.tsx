import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CourseCardProps {
  courseCode: string;
  onRemove?: () => void;
  isDragging?: boolean;
}

export function CourseCard({
  courseCode,
  onRemove,
  isDragging = false,
}: CourseCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: courseCode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        relative flex items-center justify-between
        px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg
        shadow-sm hover:shadow-md hover:border-secondary dark:hover:border-secondary hover:bg-secondary/10 dark:hover:bg-secondary/20
        transition-all cursor-grab active:cursor-grabbing
        ${isSortableDragging ? "z-50 shadow-xl scale-105 border-secondary dark:border-secondary" : ""}
      `}
    >
      {/* Course Code */}
      <span className="font-semibold text-gray-800 dark:text-gray-100 select-none">
        {courseCode}
      </span>

      {/* Remove Button */}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="
            ml-2 w-6 h-6 flex items-center justify-center
            rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300
            hover:bg-red-200 dark:hover:bg-red-800 hover:text-red-700 dark:hover:text-red-200
            transition-colors cursor-pointer
          "
          aria-label={`Remove ${courseCode}`}
        >
          ×
        </button>
      )}
    </div>
  );
}
