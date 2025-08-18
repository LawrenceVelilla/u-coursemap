import { RequirementCondition } from '@/db/types'

export interface TreeNode {
  id: string
  type: 'operator' | 'course' | 'description'
  label: string
  children?: TreeNode[]
  courseCode?: string
}

export function transformToTree(reqCondition: RequirementCondition, parentId = '', counter = { value: 0 }): TreeNode[] {
  if (!reqCondition) return []

  const nodeId = `${parentId}-${++counter.value}`

  if (reqCondition.operator === 'STANDALONE' && reqCondition.courses) {
    return reqCondition.courses.map((course, index) => ({
      id: `${nodeId}-course-${index}`,
      type: 'course' as const,
      label: course,
      courseCode: course
    }))
  }

  if (reqCondition.description || reqCondition.pattern) {
    return [{
      id: `${nodeId}-desc`,
      type: 'description' as const,
      label: reqCondition.description || reqCondition.pattern || 'Special requirement'
    }]
  }

  if (reqCondition.conditions || reqCondition.courses) {
    const children: TreeNode[] = []

    if (reqCondition.courses) {
      children.push(...reqCondition .courses.map((course, index) => ({
        id: `${nodeId}-course-${index}`,
        type: 'course' as const,
        label: course,
        courseCode: course
      })))
    }

    if (reqCondition.conditions) {
      reqCondition.conditions.forEach((childCondition, index) => {
        children.push(...transformToTree(childCondition, `${nodeId}-${index}`, counter))
      })
    }

    if (children.length > 1) {
      return [{
        id: nodeId,
        type: 'operator' as const,
        label: reqCondition.operator || 'AND',
        children
      }]
    }
    // Single child
    return children
    
  }

  return []
}