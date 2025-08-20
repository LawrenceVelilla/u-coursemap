import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface NeededByCardProps {
  courseCode: string
}

export function NeededByCard({ courseCode }: NeededByCardProps) {
  return (
    <Card className="h-fit frosted-glass">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Needed By
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <p className="text-sm text-gray-400 mt-1">
              Courses that require {courseCode}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}