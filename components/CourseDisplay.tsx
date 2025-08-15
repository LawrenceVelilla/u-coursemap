'use client'

import useCourse from '@/hooks/useCourse'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Suspense } from 'react'
import { CourseLoadingSkeleton } from './ui/courseskeleton'


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
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Error Loading Course
            </h3>
            <p className="text-gray-600 mb-4">
              Failed to load course information: {error.message}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return <CourseNotFound courseCode={courseCode} />
  }

  // Past this point, data is guaranteed to exist
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {data.courseCode}
        </CardTitle>
        <p className="text-lg text-gray-600">{data.title}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Course Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Credits:</span> {data.units?.credits || 'Not specified'}
            </div>
            <div>
              <span className="font-medium">Term:</span> {data.units?.term || 'Not specified'}
            </div>
          </div>
        </div>
          
        {data.keywords && data.keywords.length > 0 && (
          <div>
            <p className="text-gray-700">{data.keywords.join(", ")}</p>
          </div>
        )}

        {data.flattenedPrerequisites && data.flattenedPrerequisites.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                The following prerequisites are required:
              </p>
              <ul className="list-disc list-inside space-y-1">
                {data.flattenedPrerequisites.map((prereq: string, index: number) => (
                  <li key={index} className="text-gray-700">
                    {prereq}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {data.flattenedCorequisites && data.flattenedCorequisites.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Corequisites</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                The following corequisites must be taken concurrently:
              </p>
              <ul className="list-disc list-inside space-y-1">
                {data.flattenedCorequisites.map((coreq: string, index: number) => (
                  <li key={index} className="text-gray-700">
                    {coreq}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function CourseNotFound({ courseCode }: { courseCode: string }) {
  return (
    <Suspense fallback={<CourseLoadingSkeleton />}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-orange-600 mb-2">
              Course Not Found
            </h3>
            <p className="text-gray-600 mb-4">
              Could not find information for course: <strong>{courseCode}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Please check the course code and try again.
            </p>
          </div>
        </CardContent>
      </Card>
    </Suspense>
  )
}
