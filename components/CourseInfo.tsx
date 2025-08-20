import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CourseInfoCardProps {
  courseCode: string
  title: string
  credits?: string
  term?: string
  keywords?: string[]
}

export function CourseInfoCard({ 
  courseCode, 
  title, 
  credits, 
  term, 
  keywords 
}: CourseInfoCardProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-2xl text-primary font-bold">
          {courseCode}
        </CardTitle>
        <p className="text-lg text-primary">{title}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-medium">Credits:</span> {credits || 'Not specified'}
          </div>
          <div>
            <span className="font-medium">Available during {term || 'Not specified'}</span>
          </div>
        </div>
        
        {keywords && keywords.length > 0 && (
          <div>
            <p className="text-sm text-gray-600">{keywords.join(", ")}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}