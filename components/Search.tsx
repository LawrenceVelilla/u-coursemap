"use client";

import { getCourseDetails } from "@/actions/courses";
import { FinalCourseDetails } from "@/db/types";
import useCourse from "@/hooks/useCourse";
import { useState } from "react";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useCourse(searchQuery);

  const handleSearch = () => {
    setSearchQuery(searchInput.trim().toUpperCase());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter course code"
        className="border p-2 rounded"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Search
      </button>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div>
          <h2>{data.courseCode}</h2>
          <p>{data.title}</p>
          <p>Prerequisites: {data.flattenedPrerequisites.join(", ")}</p>
        </div>
      )}
    </div>
  );
}