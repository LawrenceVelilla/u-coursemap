'use client'

import { useState } from "react";
import Search  from "@/components/Search";
import { CourseDisplay } from "@/components/CourseDisplay";

export default function Home() {
  const [activeCourse, setActiveCourse] = useState<string>("");

  const handleCourseFound = (courseCode: string) => {
    setActiveCourse(courseCode);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="flex flex-col items-center space-y-12 w-full">
        <h1 className="text-4xl font-bold">UCourseMap</h1>                              
        <Search onCourseFound={handleCourseFound} />
        <CourseDisplay courseCode={activeCourse} />
      </div>
    </div>
  );
}
