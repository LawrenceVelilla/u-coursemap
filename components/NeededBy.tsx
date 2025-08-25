"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface NeededByCardProps {
  courseCode: string
  data: any
}

export function NeededByCard({ data }: NeededByCardProps) {
  const [prereqExpanded, setPrereqExpanded] = useState(true);
  const [coreqExpanded, setCoreqExpanded] = useState(true);

  const hasBoth = data?.asPrerequisite && data.asCorequisite;
  const hasPrerequisites = data?.asPrerequisite && data.asPrerequisite.length > 0;
  const hasCorequisites = data?.asCorequisite && data.asCorequisite.length > 0;

 

  const prerequisiteCourses = data?.asPrerequisite || [];
  const corequisiteCourses = data?.asCorequisite || [];

  const hasAnyData = prerequisiteCourses.length > 0 || corequisiteCourses.length > 0;

  if (!hasAnyData) {
    return (
      <Card className="h-full frosted-glass">
        <CardHeader>
          <CardTitle className="text-lg">Needed By</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-500 italic">No courses require this course</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full frosted-glass">
      <CardHeader>
        <CardTitle className="text-lg">Needed By</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 h-full overflow-y-auto">
        
        <section className="mb-4">
          <section className="mb-3">
          <span onClick={() => setPrereqExpanded((prev) => !prev)} className="text-sm text-primary cursor-pointer flex items-center">
            {hasBoth && hasPrerequisites ?
              <ChevronRight className={`h-4 w-4 mr-1 transition-transform ${prereqExpanded ? 'transform rotate-90' : ''}`} />
              : <span className="w-4 h-4 mr-1" />}
            <span className="font-semibold">Prerequisite of</span>
          </span>
         </section>  
        
        {hasPrerequisites && prereqExpanded && (
            <div className="space-y-2">
              {prerequisiteCourses.map((course: any) => (
                <div key={course.courseCode} className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="font-mono text-xs cursor-pointer">
                      {course.courseCode}
                    </Badge>
                    <p className="text-sm mt-1">{course.title}</p>
                  </div>
                </div>
              ))}
            </div>
        )}
        </section>

        <section className="mb-4">
          <section className="mb-3">
            <span onClick={() => setCoreqExpanded((prev) => !prev)} className="text-sm text-primary cursor-pointer flex items-center">
              {hasBoth && hasCorequisites ? (
                <ChevronRight className={`h-4 w-4 mr-1 transition-transform ${coreqExpanded ? 'transform rotate-90' : ''}`} />
              ) : (
                <span className="w-4 h-4 mr-1" />
              )}
              {hasCorequisites ? (
                <span className="font-semibold">Corequisite of</span>
              ) : (
                ''
              )}
            </span>
            
          </section>

        {corequisiteCourses.length > 0 && coreqExpanded && (
          <div>
            <div className="space-y-2">
              {corequisiteCourses.map((course: any) => (
                <div key={course.courseCode} className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {course.courseCode}
                    </Badge>
                    <p className="text-sm mt-1">{course.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        </section>
      </CardContent>
    </Card>
  )
}