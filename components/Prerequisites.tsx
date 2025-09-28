import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RequisiteTree } from './RequisiteTree'
import { RequirementCondition } from '@/db/types'
import { transformToTree } from '@/lib/requisite-tree'
import { Expand } from 'lucide-react'

interface PrerequisitesCardProps {
  prerequisites?: RequirementCondition
}

export function PrerequisitesCard({ prerequisites }: PrerequisitesCardProps) {
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
      </Card>
    )
  }

  return (
    <Card className="h-full frosted-glass">
      <CardContent className="p-0 h-full overflow-hidden">
        <div className="h-full overflow-y-scroll overscroll-y-contain scrollbar-hide">
          <RequisiteTree 
            requirements={prerequisites}
            title="Prerequisites"
            className="px-8 py-3 h-full"
          />
        </div>
      </CardContent>
    </Card>
  )
}