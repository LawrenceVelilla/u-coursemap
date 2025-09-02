'use client'

import { TreeNodeComponent } from './TreeNode'
import { RequirementCondition } from '@/db/types'
import { transformToTree } from '@/lib/requisite-tree'
import { cn } from '@/lib/utils'

interface RequisiteTreeProps {
  requirements: RequirementCondition
  title?: string
  className?: string
}

export function RequisiteTree({ 
  requirements, 
  title = "Prerequisites",
  className 
}: RequisiteTreeProps) {
  const treeNodes = transformToTree(requirements)

  if (treeNodes.length === 0) return null

  return (
    <div className={cn("", className)}>
      <h3 className="text-lg font-semibold flex items-center">
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
