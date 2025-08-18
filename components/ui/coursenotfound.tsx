import React, { Suspense } from 'react'
import { Card, CardContent } from './card'
import { CourseLoadingSkeleton } from './courseskeleton'


export function CourseNotFound({ courseCode }: { courseCode: string }) {
  return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-orange-600 mb-2">
              Course Not Found
            </h3>
            <p className="mb-4">
              Could not find information for course: <strong>{courseCode}</strong>
            </p>
            <p className="text-sm">
              Please check the course code and try again.
            </p>
          </div>
        </CardContent>
      </Card>
    )
}