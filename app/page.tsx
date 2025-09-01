'use client'

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Search from "@/components/Search";
import { CourseDisplay } from "@/components/CourseDisplay";
import { CourseLoadingSkeleton } from "@/components/ui/courseskeleton";

function HomeContent() {
  const searchParams = useSearchParams();
  if (!searchParams) return null;

  const courseCode = searchParams.get("code") || ""; 

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="flex flex-col items-center space-y-12 w-full">
        <h1 className="text-4xl font-bold">UCourseMap</h1>
        <Search defaultValue={courseCode} />
        <CourseDisplay courseCode={courseCode} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<CourseLoadingSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
