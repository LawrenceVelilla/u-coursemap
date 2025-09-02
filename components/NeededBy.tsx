"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface NeededByCardProps {
  data: any
}

export function NeededByCard({ data }: NeededByCardProps) {
  const router = useRouter();
  const [prereqExpanded, setPrereqExpanded] = useState(true);
  const [coreqExpanded, setCoreqExpanded] = useState(true);

  const handleCourseClick = (courseCode: string) => {
    router.push(`/?code=${courseCode}`);
  };

  const [prerequisiteCourses, corequisiteCourses] = [data.prerequisites || [], data.corequisites || []];
  const [hasPrerequisites, hasCorequisites] = [prerequisiteCourses.length > 0, corequisiteCourses.length > 0];
  const hasBoth = hasPrerequisites && hasCorequisites;

  if (!hasPrerequisites && !hasCorequisites) {
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
        <CardTitle className="text-lg pt-6">Needed By</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 h-full overflow-hidden">
        <section className="h-full overflow-y-auto pr-2">
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
                    <Badge 
                      variant="outline" 
                      className="font-mono text-xs cursor-pointer hover:bg-secondary hover:text-primary transition-colors duration-150"
                      onClick={() => handleCourseClick(course.courseCode)}
                    >
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
                    <Badge 
                      variant="secondary" 
                      className="font-mono text-xs cursor-pointer hover:bg-primary hover:text-secondary transition-colors duration-150"
                      onClick={() => handleCourseClick(course.courseCode)}
                    >
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
        </section>
      </CardContent>
    </Card>
  )
}