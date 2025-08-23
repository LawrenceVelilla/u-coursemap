import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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
    <Card className="max-w-3xl mx-auto frosted-glass">
      <CardHeader>
        <CardTitle className="text-2xl text-primary font-bold">
          {courseCode}
        </CardTitle>
        <p className="text-lg text-primary">{title}</p>
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
        <div className="flex flex-col gap-2 text-sm">          
            <span className="font-medium">Credits: {credits || 'Not specified'}</span>
            <span className="font-medium">Available: {term || 'Not specified'}</span>          
        </div>
        
        
      </CardContent>
    </Card>
  )
}