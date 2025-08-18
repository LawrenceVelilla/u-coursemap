import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { TreeNode } from '@/lib/requisite-tree'

interface TreeNodeComponentProps {
  node: TreeNode
  depth: number
}

export function TreeNodeComponent({ node, depth }: TreeNodeComponentProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = node.children && node.children.length > 0

  const indentStyle = depth > 0 ? `ml-${Math.min(depth * 4, 16)}` : ''
  
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
        <span className="font-medium text-primary hover:text-blue-800 cursor-pointer">
          {node.label}
        </span>
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
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded px-2 py-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )
          ) : (
            <div className="w-4 h-4" />
          )}
          <span className={cn(
            "font-semibold text-sm px-2 py-1 rounded",
            node.label === 'AND' ? "text-green-800" : "text-orange-800"
          )}>
            {getOperatorDisplay(node.label)}
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