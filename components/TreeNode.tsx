import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { TreeNode } from '@/lib/requisite-tree'
import Link from 'next/link'

interface TreeNodeComponentProps {
  node: TreeNode
  depth: number
}

export function TreeNodeComponent({ node, depth }: TreeNodeComponentProps) {
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
        <Link href={``} className="inline-block p-1 rounded-md transition-colors hover:bg-[#606c5d] hover:text-[#fefae0] duration-200 ">
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
            isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )
          ) : (
            <div className="w-4 h-4" />
          )}
          <span className="font-semibold italic text-lg ml-2 px-2 py-1 rounded-xl text-secondary
            bg-primary hover:bg-secondary hover:text-primary transition-colors duration-200 "
          >
            {getOperatorDisplay(node.label)}
          </span>
          </span>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-1 border-l-2 border-gray-200 ml-2 pl-3">
            {node.children!.map((child) => (
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