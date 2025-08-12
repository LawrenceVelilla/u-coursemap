"use client";

import { getCourseDetails } from "@/actions/courses";
import { FinalCourseDetails } from "@/db/types";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FinalCourseDetails | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const course = await getCourseDetails(query.trim().toUpperCase());
      setResult(course);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="flex gap-2 border-2 p-3 rounded-md bg-white">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter course code (e.g., CMPUT 200)"
          className="flex-1 px-3 py-2 border rounded-md"
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {result && (
        <div className="p-4 border rounded-md bg-white">
          <h2 className="text-xl font-bold">
            {result.courseCode}
          </h2>
          <p className="text-gray-600">{result.title}</p>
          
          <div className="mt-3 space-y-2">
            <p><strong>Credits:</strong> {result.units?.credits}</p>

            {result.flattenedPrerequisites.length > 0 && (
              <div>
                <h2 className="text-lg">Prerequisites:</h2>
                <div className="flex flex-wrap gap-1 mt-1">
                  {result.flattenedPrerequisites.map((prereq, i) => (
                    <li key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                      {prereq}
                    </li>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}