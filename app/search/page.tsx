'use client'

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Search from "@/components/Search";
import { CourseDisplay } from "@/components/CourseDisplay";
import { CourseLoadingSkeleton } from "@/components/ui/courseskeleton";

function SearchPageComponent() {
  const searchParams = useSearchParams();
  if (!searchParams) return null;

  const courseCode = (searchParams.get("code") || "").replace('-', ' '); 

  return (
    
      <div className="flex flex-col items-center space-y-12 w-full">
        <h1 className="text-4xl font-bold">UCourseMap</h1>
        <Search defaultValue={courseCode} />
        <CourseDisplay courseCode={courseCode} />
      </div>
  );
}

export default function SearchPage() {
  return(
    <Suspense fallback={<CourseLoadingSkeleton />}>
      <SearchPageComponent />
    </Suspense>
  )
}
