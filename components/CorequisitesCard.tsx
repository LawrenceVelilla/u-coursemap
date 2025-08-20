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
      <Card className="h-fit">
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
    <Card className="h-fit">
      <CardContent className="p-0">
        <RequisiteTree 
          requirements={corequisites}
          title="Corequisites"
          className="p-6"
        />
      </CardContent>
    </Card>
  )
}