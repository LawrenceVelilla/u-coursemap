'use client'

import { useState } from 'react'
import useCourse from '@/hooks/useCourse'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CourseNotFound } from './ui/coursenotfound'
import { CourseLoadingSkeleton } from './ui/courseskeleton'
import { CourseInfoCard } from './CourseInfo'
import { PrerequisitesCard } from './Prerequisites'
import { CorequisitesCard } from './CorequisitesCard'
import { NeededByCard } from './NeededBy'
import { FocusedCourseModal } from './FocusedCourseModal'
import { useCourseRequiring } from '@/hooks/useCourseRequiring'

interface CourseDisplayProps {
  courseCode: string
}

export function CourseDisplay({ courseCode }: CourseDisplayProps) {
  const { data: courseData, isLoading: courseLoading, error: courseError } = useCourse(courseCode);
  const { data: requiringData, isLoading: requiringLoading, error: requiringError } = useCourseRequiring(courseCode);

  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!courseCode) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">
            Search for a course to view its details
          </p>
        </CardContent>
      </Card>
    )
  }

  if (courseLoading || requiringLoading) {
    return <CourseLoadingSkeleton />
  }

  if (courseError || requiringError) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <p className="text-red-600 text-center">
            Error loading course: {courseError?.message || requiringError?.message}
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!courseData) {
    return <CourseNotFound courseCode={courseCode} />
  }

  const term = courseData.units?.term.split(',')[0];
  const termDisp = (() => {
    switch (term) {
      case 'FALL':
        return 'Fall';
      case 'W':
        return 'Winter';
      case 'EITHER':
        return 'Fall or Winter';
      default:
        return term || 'Not specified';
    }
  })();

  return (
    <>
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Prerequisites - Left tall card */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 h-[35rem]">
            <PrerequisitesCard 
              prerequisites={courseData.requirements?.prerequisites}
              onOpenModal={() => setIsModalOpen(true)}
            />
          </div>
          
          {/* Needed By - Right tall card */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 h-[35rem]">
            <NeededByCard courseCode={courseData.courseCode} data={requiringData} />
          </div>
          
          {/* Course Information - Top right large card */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[17rem]">
            <CourseInfoCard
              courseCode={courseData.courseCode}
              title={courseData.title}
              credits={courseData.units?.credits?.toString()}
              term={termDisp}
              keywords={courseData.keywords}
            />
          </div>
          
          {/* Corequisites - Bottom left small card */}
          <div className="col-start-3 col-end-3 col-span-1 md:col-span-1 lg:col-span-1 h-[17rem] ">
            <CorequisitesCard corequisites={courseData.requirements?.corequisites} />
          </div>
          
          {/* Other Info - Bottom right small card */}
          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 h-[17rem]">
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
      <FocusedCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={courseData}
      />
    </>
  )
}