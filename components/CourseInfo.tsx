import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CourseInfoCardProps {
  courseCode: string
  title: string
  credits?: string
  term?: string
  keywords?: string[]
  description?: string
}

export function CourseInfoCard({ 
  courseCode, 
  title, 
  credits, 
  term, 
  keywords,
  description
}: CourseInfoCardProps) {
  return (
    <Card className="mx-auto h-full frosted-glass">
      <CardHeader>
        <CardTitle className="text-2xl text-primary font-bold">
          {courseCode} <span className="text-lg font-light ml-2">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {keywords && keywords.length > 0 && (
          <div>
            <p className="text-sm text-gray-600">
              {keywords.map((keyword) => (
                <Badge className='mr-2 mb-2 rounded-2xl bg-secondary text-primary
                hover:bg-primary hover:text-secondary transition-colors duration-150'
                 key={keyword}>{keyword}</Badge>
              ))}
            </p>
          </div>
        )}
        <hr />
        {description && (
          <div>
            <p className="text-sm">{description}</p>
          </div>
        )}
        <div className="flex justify-between text-sm">          
            <span className="font-medium">Credits: {credits || 'Not specified'}</span>
            <span className="font-medium">Available: {term || 'Not specified'}</span>          
        </div>
        
        
      </CardContent>
    </Card>
  )
}