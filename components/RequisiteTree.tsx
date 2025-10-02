
import { ChevronRight } from 'lucide-react'
import { RequirementCondition } from '@/db/types'
import { transformToTree } from '@/lib/requisite-tree'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import Link from 'next/link'

interface RequisiteTreeProps {
  requirements: RequirementCondition
  title?: string
  className?: string
}

function TreeNodeComponent({ node, depth }: { node: any, depth: number }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = node.children && node.children.length > 0

  const indentStyle = depth > 0 ? `ml-${Math.min(depth * 12, 64)}px` : ''

  const getOperatorDisplay = (operator: string) => {
    switch (operator.toUpperCase()) {
      case 'OR': return 'One of:'
      case 'AND': return 'All of:'
      default: return operator
    }
  }

  if (node.type === 'course') {
    return (
      <div className={cn("py-1 flex items-center gap-2", indentStyle)}>
        <Link 
          href={`/search?code=${node.label.replace(' ', '-')}`}
          className="text-sm inline-block p-1 rounded-md transition-colors hover:bg-[#606c5d] hover:text-[#fefae0] duration-150"
        >
          {node.label}
        </Link>
      </div>
    )
  }

  if (node.type === 'description') {
    return (
      <div className={cn("py-1 italic", indentStyle)}>
        {node.label}
      </div>
    )
  }

  if (node.type === 'operator') {
    return (
      <div className={cn("py-1", indentStyle)}>
        <div 
          className="flex items-center gap-2 cursor-pointer
          p-1 rounded-md "
        >
          <span onClick={() => setIsExpanded(!isExpanded)} className="flex items-center">
          {hasChildren ? (
            <ChevronRight className={cn(
              "w-4 h-4 transition-transform duration-150",
              isExpanded && "rotate-90"
            )} />
          ) : (
            <div className="w-4 h-4" />
          )}
          <span className="font-semibold font-mono text-sm ml-2 px-2 rounded-md 
            border border-primary-grey hover:bg-secondary hover:text-primary transition-colors duration-150"
          >
            {getOperatorDisplay(node.label)}
          </span>
          </span>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-1 border-l-2 border-gray-200 ml-2 pl-3">
            {node.children!.map((child: any) => (
              <TreeNodeComponent 
                key={child.id} 
                node={child} 
                depth={depth + 1} 
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return null
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
