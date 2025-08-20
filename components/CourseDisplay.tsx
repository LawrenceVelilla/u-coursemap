'use client'

import useCourse from '@/hooks/useCourse'
import { Card, CardContent } from '@/components/ui/card'
import { CourseNotFound } from './ui/coursenotfound'
import { CourseLoadingSkeleton } from './ui/courseskeleton'
import { CourseInfoCard } from './CourseInfo'
import { PrerequisitesCard } from './Prerequisites'
import { CorequisitesCard } from './CorequisitesCard'
import { NeededByCard } from './NeededBy'

interface CourseDisplayProps {
  courseCode: string
}

export function CourseDisplay({ courseCode }: CourseDisplayProps) {
  const { data, isLoading, error } = useCourse(courseCode)

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

  if (isLoading) {
    return <CourseLoadingSkeleton />
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <p className="text-red-600 text-center">
            Error loading course: {error.message}
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return <CourseNotFound courseCode={courseCode} />
  }

  let term = data.units?.term.split(',')[0];
  let termDisp = (() => {
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
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main course info */}
        <div className="lg:col-span-2">
          <CourseInfoCard
            courseCode={data.courseCode}
            title={data.title}
            credits={data.units?.credits?.toString()}
            term={termDisp}
            keywords={data.keywords}
          />
        </div>
        
        {/* Prerequisites card */}
        <PrerequisitesCard prerequisites={data.requirements?.prerequisites} />
        
        {/* Corequisites card */}
        <CorequisitesCard corequisites={data.requirements?.corequisites} />
        
        {/* Needed by card - spans full width */}
        <div className="lg:col-span-2">
          <NeededByCard courseCode={data.courseCode} />
        </div>
      </div>
    </div>
  )
}