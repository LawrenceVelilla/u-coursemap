import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RequisiteTree } from './RequisiteTree'
import { RequirementCondition } from '@/db/types'
import { transformToTree } from '@/lib/requisite-tree'
import { Expand } from 'lucide-react'

interface PrerequisitesCardProps {
  prerequisites?: RequirementCondition
  onOpenModal?: () => void
}

export function PrerequisitesCard({ prerequisites, onOpenModal }: PrerequisitesCardProps) {
  const hasPrerequisites = prerequisites && transformToTree(prerequisites).length > 0
  
  if (!hasPrerequisites) {
    return (
      <Card className="h-full frosted-glass relative">
        <CardHeader>
          <CardTitle className="text-xl">Prerequisites</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 italic">No prerequisites required</p>
        </CardContent>
        {onOpenModal && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenModal}
            className="absolute top-2 right-2"
          >
            <Expand className="h-4 w-4" />
          </Button>
        )}
      </Card>
    )
  }

  return (
    <Card className="h-full frosted-glass relative">
      <CardContent className="p-0 h-full overflow-hidden">
        <div className="h-full overflow-y-auto">
          <RequisiteTree 
            requirements={prerequisites}
            title="Prerequisites"
            className="p-6"
          />
        </div>
        {onOpenModal && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenModal}
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
          >
            <Expand className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}