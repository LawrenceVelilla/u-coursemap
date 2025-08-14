"use client";
import useCourse from "@/hooks/useCourse";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


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
    <div className="flex flex-col items-center space-y-4">
      <div className="flex w-full max-w-lg items-center space-x-2">
        <Input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter course code (e.g., CMPUT 174)"
          className="flex-1"
        />
        <Button onClick={handleSearch} className="min-w-[80px]">
          Search
        </Button>
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
}