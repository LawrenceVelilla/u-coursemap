'use client'

import useCourse from '@/hooks/useCourse'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CourseNotFound } from './ui/coursenotfound'
import { CourseLoadingSkeleton } from './ui/courseskeleton'
import { RequisiteTree } from './RequisiteTree'

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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-primary font-bold">
          {data.courseCode}
        </CardTitle>
        <p className="text-lg text-primary">{data.title}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Course Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Credits:</span> {data.units?.credits || 'Not specified'}
            </div>
            <div>             
              <span className="font-medium">Available during {termDisp}</span> 
            </div>
          </div>
        </div>
          
        {data.keywords && data.keywords.length > 0 && (
          <div>
            <p>{data.keywords.join(", ")}</p>
          </div>
        )}

        {data.requirements?.prerequisites && (
          <RequisiteTree
            requirements={data.requirements.prerequisites}
            title="Prerequisites"
          />
        )}
      
        {data.requirements?.corequisites && (
          <RequisiteTree 
            requirements={data.requirements.corequisites}
            title="Corequisites"
          />
        )}
      </CardContent>
    </Card>
  )
}