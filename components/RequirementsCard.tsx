import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RequisiteTree } from './RequisiteTree'
import { RequirementCondition } from '@/db/types'
import { transformToTree } from '@/lib/requisite-tree'

type RequirementType = 'prerequisites' | 'corequisites'

interface RequirementsCardProps {
  requirements?: RequirementCondition
  type: RequirementType
  className?: string
}

const typeConfig = {
  prerequisites: {
    title: 'Prerequisites',
    titleSize: 'text-xl',
    emptyMessage: 'No prerequisites required'
  },
  corequisites: {
    title: 'Corequisites',
    titleSize: 'text-lg py-3',
    emptyMessage: 'No corequisites required'
  }
} as const

export function RequirementsCard({ requirements, type, className = '' }: RequirementsCardProps) {
  const config = typeConfig[type]
  const hasRequirements = requirements && transformToTree(requirements).length > 0

  if (!hasRequirements) {
    return (
      <Card className={`h-full frosted-glass ${className}`}>
        <CardHeader>
          <CardTitle className={config.titleSize}>{config.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 italic">{config.emptyMessage}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`h-full frosted-glass ${className}`}>
      <CardContent className="p-0 h-full overflow-hidden">
        <div className="h-full overflow-y-scroll overscroll-y-contain scrollbar-hide">
          <RequisiteTree
            requirements={requirements}
            title={config.title}
            className="px-8 py-3 h-full"
          />
        </div>
      </CardContent>
    </Card>
  )
}