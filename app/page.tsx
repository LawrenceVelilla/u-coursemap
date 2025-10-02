'use client'

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Search from "@/components/Search";
import { CourseLoadingSkeleton } from "@/components/ui/courseskeleton";

function HomeContent() {
  const searchParams = useSearchParams();
  if (!searchParams) return null;

  const courseCode = (searchParams.get("code") || "").replace('-', ' '); 

  return (
    <div className="flex min-h-screen flex-col  p-6 md:p-24">
      <section className="flex flex-col space-y-12 w-full">
        <h1 className="text-5xl font-bold mb-2 ">UCourseMap</h1>
        <h2 className="text-md mb-6 text-gray-500">Visualize course prerequisites and plan your academic journey with ease.</h2>
       </section>

      <section className="flex flex-col space-y-12 w-full mt-6 mb-6">
        <h1>Begin you by searching for a class you&apos;re interested in</h1>
        <Search defaultValue={courseCode} />
      </section>

      <section className="">
        <h1>Explore course requirements, information and more!</h1>
        {/* Have videos here or maybe cards with course information as stand in.
        Maybe a carousel? Maybe a video walkthrough? Maybe an animation of a course being searched
        using the typing animation of a word being typed out?
        */}
      </section>

      <section className="mt-12"> 
        {/* Have a google form where people can submit feedback or a missing course/department  */}
      </section>
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
