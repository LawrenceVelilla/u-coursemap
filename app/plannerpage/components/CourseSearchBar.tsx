"use client";

import React, { useState } from "react";

interface CourseSearchBarProps {
  onAddCourse: (courseCode: string) => void;
  existingCourses: string[];
}

export function CourseSearchBar({
  onAddCourse,
  existingCourses,
}: CourseSearchBarProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const courseCode = inputValue.trim().toUpperCase();

    if (!courseCode) {
      alert("Please enter a course code");
      return;
    }

    if (existingCourses.includes(courseCode)) {
      alert("Course already added");
      return;
    }

    onAddCourse(courseCode);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="w-full mb-6">
      <div className="mb-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-primary">Add Courses</h2>
        <p className="text-sm text-gray-600 dark:text-primary-300">
          Enter a course code to add to your canvas
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter course code (e.g., CMPUT 301, MATH 214)"
          className="
            flex-1 px-4 py-3 border-[3px] rounded-lg
           text-gray-900 dark:text-gray-100
            focus:outline-none focus:border-secondary dark:focus:border-secondary frosted-glass
            transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500
          "
        />
        <button
          onClick={handleAdd}
          className="
            px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors
          "
        >
          Add
        </button>
      </div>
    </div>
  );
}
