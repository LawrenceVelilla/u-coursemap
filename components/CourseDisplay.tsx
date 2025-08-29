"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CourseLoadingSkeleton } from "./ui/courseskeleton"
import { CourseInfoCard } from "./CourseInfo"
import { PrerequisitesCard } from "./Prerequisites"
import { CorequisitesCard } from "./CorequisitesCard"
import { NeededByCard } from "./NeededBy"
import { FocusedCourseModal } from "./FocusedCourseModal"
import { useQueries } from "@tanstack/react-query"
import { getCourseDetails, getCoursesNeeding } from "@/actions/courses"


interface CourseDisplayProps {
  courseCode: string
}


export function CourseDisplay({ courseCode }: CourseDisplayProps) {
  const results = useQueries({
    queries: [
      {
        queryKey: ["course", courseCode],
        queryFn: () => getCourseDetails(courseCode),
        enabled: !!courseCode && courseCode.trim().length > 0,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
      {
        queryKey: ["courseRequiring", courseCode],
        queryFn: () => getCoursesNeeding(courseCode),
        enabled: !!courseCode && courseCode.trim().length > 0,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      }
    ]
  })
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

  const courseResult = results[0]
  const requiringResult = results[1]


  if (courseResult.error || requiringResult.error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <p className="text-red-600 text-center">
            Error loading course: {courseResult.error?.message || requiringResult.error?.message}
          </p>
        </CardContent>
      </Card>
    )
  }

  if (courseResult.isLoading || requiringResult.isLoading) {
    return <CourseLoadingSkeleton />
  }

  const term = courseResult.data.units?.term.split(",")[0]
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
              prerequisites={courseResult.data.requirements?.prerequisites}
              onOpenModal={() => setIsModalOpen(true)}
            />
          </div>

          {/* Course Information - Top right large card */}
          <div className="col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-3 lg:col-span-2 h-[17rem] md:h-auto lg:h-[17rem]">
            <CourseInfoCard
              courseCode={courseResult.data.courseCode}
              title={courseResult.data.title}
              credits={courseResult.data.units?.credits?.toString()}
              term={termDisp}
              keywords={courseResult.data.keywords}
            />
          </div>

          {/* Needed By - Right tall card */}
          <div className="col-span-1 md:row-start-1 lg:row-start-1 lg:row-span-2 h-[35rem] md:h-auto lg:h-[35rem]">
            <NeededByCard courseCode={courseResult.data.courseCode} data={requiringResult.data} />
          </div>

          {/* Corequisites - Bottom left small card */}
          <div className="col-span-1 lg:col-start-3 lg:row-start-2 h-[17rem] md:h-auto lg:h-[17rem]">
            <CorequisitesCard corequisites={courseResult.data.requirements?.corequisites} />
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
      <FocusedCourseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} course={courseResult.data} />
    </>
  )
}
