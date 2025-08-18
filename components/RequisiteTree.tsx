'use client'

import { TreeNodeComponent } from './TreeNode'
import { RequirementCondition } from '@/db/types'
import { transformToTree } from '@/lib/requisite-tree'
import { cn } from '@/lib/utils'

interface PrerequisiteTreeProps {
  requirements: RequirementCondition
  title?: string
  className?: string
}

export function RequisiteTree({ 
  requirements, 
  title = "Prerequisites",
  className 
}: PrerequisiteTreeProps) {
  const treeNodes = transformToTree(requirements)

  if (treeNodes.length === 0) return null

  return (
    <div className={cn("space-y-2", className)}>
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        {title}
      </h3>
      <div className=" p-4 rounded-lg">
        {treeNodes.map((node) => (
          <TreeNodeComponent key={node.id} node={node} depth={0} />
        ))}
      </div>
    </div>
  )
}

