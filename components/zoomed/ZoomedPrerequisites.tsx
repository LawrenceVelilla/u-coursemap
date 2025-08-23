'use client'

import { RequisiteTree } from '../RequisiteTree'
import { RequirementCondition } from '@/db/types'

interface ModalPrerequisitesProps {
  prerequisites?: RequirementCondition
}

export function ZoomedInPrereqs({ prerequisites }: ModalPrerequisitesProps) {
  return (
    <div className="h-full frosted-glass rounded-lg border p-6">
      <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
      
      {prerequisites ? (
        <div className="space-y-4">
          <RequisiteTree 
            requirements={prerequisites} 
            title=""
            className="h-full overflow-y-auto"
          />
          <div className="text-sm text-muted-foreground mt-4 pt-4 border-t">
            <p>💡 <strong>Tip:</strong> Click on course codes to explore their requirements</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <div className="text-center">
            <p className="text-lg mb-2">No Prerequisites</p>
            <p className="text-sm">This course has no prerequisite requirements</p>
          </div>
        </div>
      )}
    </div>
  )
}