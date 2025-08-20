import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RequisiteTree } from './RequisiteTree'
import { RequirementCondition } from '@/db/types'
import { transformToTree } from '@/lib/requisite-tree'

interface PrerequisitesCardProps {
  prerequisites?: RequirementCondition
}

export function PrerequisitesCard({ prerequisites }: PrerequisitesCardProps) {
  const hasPrerequisites = prerequisites && transformToTree(prerequisites).length > 0
  
  if (!hasPrerequisites) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-xl">Prerequisites</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 italic">No prerequisites required</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-fit">
      <CardContent className="p-0">
        <RequisiteTree 
          requirements={prerequisites}
          title="Prerequisites"
          className="p-6"
        />
      </CardContent>
    </Card>
  )
}