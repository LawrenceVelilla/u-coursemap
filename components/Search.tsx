"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface SearchProps {
  onCourseFound?: (courseCode: string) => void
  defaultValue?: string
}

export default function Search({ onCourseFound, defaultValue = "" }: SearchProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(defaultValue);


  // Sync the default value on the search bar with prop changes 
  // (Displays the Current CourseCode on the Search Bar) for a better UX when navigating
  useEffect(() => {
    setSearchInput(defaultValue);
  }, [defaultValue]);

  const handleSearch = () => {
    const courseCode = searchInput.trim().toUpperCase();
    if (courseCode && onCourseFound) {
      onCourseFound(courseCode);
    }
    router.push(`/search?code=${courseCode}`);

  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col space-y-4">
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
        <Button onClick={handleSearch} className="min-w-[80px] text-primary bg-secondary hover:bg-secondary hover:text-primary transition-colors duration-150">
          Search
        </Button>
      </div>
    </div>
  );
}