import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RequisiteTree } from './RequisiteTree'
import { RequirementCondition } from '@/db/types'
import { transformToTree } from '@/lib/requisite-tree'

interface CorequisitesCardProps {
  corequisites?: RequirementCondition
}

export function CorequisitesCard({ corequisites }: CorequisitesCardProps) {
  const hasCorequisites = corequisites && transformToTree(corequisites).length > 0
  
  if (!hasCorequisites) {
    return (
      <Card className="h-full frosted-glass">
        <CardHeader>
          <CardTitle className="text-lg">Corequisites</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 italic">No corequisites required</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full frosted-glass">
      <CardContent className="p-0 h-full overflow-hidden">
        <div className="h-full overflow-y-scroll overscroll-y-contain scrollbar-hide">
          <RequisiteTree
            requirements={corequisites}
            title="Corequisites"
            className="px-8 py-3 h-full"
          />
        </div>
      </CardContent>
    </Card>
  )
}