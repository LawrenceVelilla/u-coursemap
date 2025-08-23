"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchProps {
  onCourseFound?: (courseCode: string) => void
}

export default function Search({ onCourseFound }: SearchProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    const courseCode = searchInput.trim().toUpperCase();
    if (courseCode && onCourseFound) {
      onCourseFound(courseCode);
    }
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
          aria-label="Search for a course"
        />
        <Button onClick={handleSearch} className="min-w-[80px] text-secondary hover:bg-secondary hover:text-primary transition-colors duration-150">
          Search
        </Button>
      </div>
    </div>
  );
}