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
        px-4 py-3 bg-white border-2 border-gray-300 rounded-lg
        shadow-sm hover:shadow-md hover:border-blue-400
        transition-all cursor-grab active:cursor-grabbing
        ${isSortableDragging ? "z-50 shadow-xl scale-105" : ""}
      `}
    >
      {/* Course Code */}
      <span className="font-semibold text-gray-800 select-none">
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
            rounded-full bg-red-100 text-red-600
            hover:bg-red-200 hover:text-red-700
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
