"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CourseLoadingSkeleton } from "./ui/courseskeleton"
import { CourseInfoCard } from "./CourseInfo"
import { RequirementsCard } from "./RequirementsCard"
import { NeededByCard } from "./NeededBy"
import { useQueries } from "@tanstack/react-query"

interface CourseDisplayProps {
  courseCode: string
}


export function CourseDisplay({ courseCode }: CourseDisplayProps) {
  const results = useQueries({
    queries: [
      {
        queryKey: ["course", courseCode],
        queryFn: async () => await fetch(`/api/course/${courseCode}/information`).then(res => {
          if (!res.ok) {
            throw new Error("Course not found");
          }
          return res.json();
        }),
        enabled: !!courseCode && courseCode.trim().length > 0,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60 * 24,
      },
      {
        queryKey: ["coursesNeeding", courseCode],
        queryFn: async () => await fetch(`/api/course/${courseCode}/neededBy`).then(res => {
          if (!res.ok) {
            throw new Error("Course not found");
          }
          return res.json();
        }),
        enabled: !!courseCode && courseCode.trim().length > 0,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60 * 24,
      }
    ]
  });
  const courseDetails = results[0];
  const coursesNeeding = results[1];

 
  if (!courseCode) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">Search for a course to view its details</p>
        </CardContent>
      </Card>
    )
  }



  if (courseDetails.isError || coursesNeeding.isError) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <p className="text-red-600 text-center">
            Error loading course: {courseDetails.error?.message || coursesNeeding.error?.message}
          </p>
        </CardContent>
      </Card>
    )
  }

  if (courseDetails.isLoading || coursesNeeding.isLoading) {
    return <CourseLoadingSkeleton />
  }

  if (!courseDetails.data) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <p className="text-red-600 text-center">
            Course not found: &quot;{courseCode}&quot; does not exist in our database.
          </p>
        </CardContent>
      </Card>
    )
  }

  const term = courseDetails.data.units?.term.split(",")[0]
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
    <div>
      <div className="w-full max-w-7xl mx-auto">
        <div
          className="grid gap-4
          grid-cols-1 
          md:grid-cols-3
          lg:grid-cols-4 lg:grid-rows-2"
        >
          {/* Reddit Discussions */}
          <div className="col-span-1 md:row-start-3 md:col-span-3 lg:col-span-1 lg:row-span-2 h-auto lg:h-208">
            <Card className="h-full frosted-glass">
              <CardHeader>
                <CardTitle className="text-lg">Reddit Discussions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Additional course information will be displayed here.</p>
              </CardContent>
            </Card>
          </div>

          {/* Course Information - Top right */}
          <div className="col-span-1 md:col-span-3 lg:col-span-3 lg:row-span-1 h-auto lg:h-100">
            <CourseInfoCard
              courseCode={courseDetails.data.courseCode}
              title={courseDetails.data.title}
              credits={courseDetails.data.units?.credits?.toString()}
              term={termDisp}
              keywords={courseDetails.data.keywords}
              description={courseDetails.data.description}
            />
          </div>

          {/* Prerequisites - Bottom right row */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-1 lg:h-100 md:h-75">
            <RequirementsCard
              type="prerequisites"
              requirements={courseDetails.data.requirements?.prerequisites}
            />
          </div>

          {/* Needed By - Bottom right row */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-1 lg:h-100 md:h-75">
            <NeededByCard data={coursesNeeding.data} />
          </div>

          {/* Corequisites - Bottom right row */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-1 lg:h-100 md:h-75">
            <RequirementsCard
              type="corequisites"
              requirements={courseDetails.data.requirements?.corequisites}
            />
          </div>
        </div>
      </div>

    </div>
  )
}
