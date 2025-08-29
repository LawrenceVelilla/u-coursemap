"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CourseLoadingSkeleton } from "./ui/courseskeleton"
import { CourseInfoCard } from "./CourseInfo"
import { PrerequisitesCard } from "./Prerequisites"
import { CorequisitesCard } from "./CorequisitesCard"
import { NeededByCard } from "./NeededBy"
import { FocusedCourseModal } from "./FocusedCourseModal"
import { useQueries, useQuery } from "@tanstack/react-query"
import { getCourseDetails, getCoursesNeeding } from "@/actions/courses"


interface CourseDisplayProps {
  courseCode: string
}


export function CourseDisplay({ courseCode }: CourseDisplayProps) {
  const results = useQuery({
        queryKey: ["course", courseCode],
        queryFn: async () => await fetch(`/api/course/${courseCode}`).then(res => {
          if (!res.ok) {
            throw new Error("Course not found");
          }
          return res.json();
        }),
        enabled: !!courseCode && courseCode.trim().length > 0,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      });
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!courseCode) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">Search for a course to view its details</p>
        </CardContent>
      </Card>
    )
  }



  if (results.isError) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <p className="text-red-600 text-center">
            Error loading course: {results.error?.message}
          </p>
        </CardContent>
      </Card>
    )
  }

  if (results.isLoading) {
    return <CourseLoadingSkeleton />
  }

  const term = results.data.units?.term.split(",")[0]
  const termDisp = (() => {
    switch (term) {
      case "FALL":
        return "Fall"
      case "W":
        return "Winter"
      case "EITHER":
        return "Fall or Winter"
      default:
        return term || "Not specified"
    }
  })()

  return (
    <>
      <div className="w-full max-w-7xl mx-auto">
        <div
          className="grid gap-4 
          grid-cols-1 
          md:grid-cols-2 
          lg:grid-cols-4 lg:grid-rows-4 lg:grid-flow-col-dense"
        >
          {/* Prerequisites - Left tall card */}
          <div className="col-span-1 lg:row-span-2 h-[35rem] md:h-auto lg:h-[35rem]">
            <PrerequisitesCard
              prerequisites={results.data.requirements?.prerequisites}
              onOpenModal={() => setIsModalOpen(true)}
            />
          </div>

          {/* Course Information - Top right large card */}
          <div className="col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-3 lg:col-span-2 h-[17rem] md:h-auto lg:h-[17rem]">
            <CourseInfoCard
              courseCode={results.data.courseCode}
              title={results.data.title}
              credits={results.data.units?.credits?.toString()}
              term={termDisp}
              keywords={results.data.keywords}
            />
          </div>

          {/* Needed By - Right tall card */}
          <div className="col-span-1 md:row-start-1 lg:row-start-1 lg:row-span-2 h-[35rem] md:h-auto lg:h-[35rem]">
            <NeededByCard courseCode={results.data.courseCode} data={results.data.requiring} />
          </div>

          {/* Corequisites - Bottom left small card */}
          <div className="col-span-1 lg:col-start-3 lg:row-start-2 h-[17rem] md:h-auto lg:h-[17rem]">
            <CorequisitesCard corequisites={results.data.requirements?.corequisites} />
          </div>

          {/* Other Info - Bottom right small card */}
          <div className="col-span-1 lg:col-start-4 lg:row-start-2 h-[17rem] md:h-auto lg:h-[17rem]">
            <Card className="h-full frosted-glass">
              <CardHeader>
                <CardTitle className="text-lg">Other Info</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Additional course information will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Focused Course Modal */}
      <FocusedCourseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} course={results.data} />
    </>
  )
}
