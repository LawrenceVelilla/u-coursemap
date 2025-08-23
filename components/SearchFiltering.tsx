"use client";

import React, { useState } from "react";
import useCourse from "@/hooks/useCourse";
import { useDebounce } from "@/hooks/useDebounce";

export const SearchCourse = () => {
    const [searchInput, setSearchInput] = useState("");
    const debouncedSearch = useDebounce(searchInput.toUpperCase(), 500);
    const { data, error, isLoading } = useCourse(debouncedSearch);

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Enter course code (e.g., CMPUT 174)"
                />
                <button
                    onClick={() => setSearchInput("")}
                    disabled={!searchInput}
                    className="ml-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                    Clear
                </button>
            </div>
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
};
export default SearchCourse;