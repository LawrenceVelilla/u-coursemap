'use client'

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Search from "@/components/Search";
import { CourseDisplay } from "@/components/CourseDisplay";
import { CourseLoadingSkeleton } from "@/components/ui/courseskeleton";

export default function SearchPageComponent() {
  const searchParams = useSearchParams();
  if (!searchParams) return null;

  const courseCode = (searchParams.get("code") || "").replace('-', ' '); 

  return (
    <Suspense fallback={<CourseLoadingSkeleton />}>
    <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="flex flex-col items-center space-y-12 w-full">
        <Search defaultValue={courseCode} />
        <CourseDisplay courseCode={courseCode} />
      </div>
    </div>
    </Suspense>
  );
}

