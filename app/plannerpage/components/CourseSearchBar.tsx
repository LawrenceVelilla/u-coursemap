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
            flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg
            focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
            transition-all
          "
        />
        <button
          onClick={handleAdd}
          className="
            px-6 py-3 bg-secondary text-white font-medium rounded-lg
            hover:bg-primary hover:text-secondary transition-colors
          "
        >
          Add
        </button>
      </div>
    </div>
  );
}
