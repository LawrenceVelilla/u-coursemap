'use client'

import { useEffect } from 'react'
import { RequirementCondition } from '@/db/types'
import { ZoomedInPrereqs} from './zoomed/ZoomedPrerequisites'
import { FinalCourseDetails } from '@/db/types'


interface FocusedCourseModalProps {
  isOpen: boolean
  onClose: () => void
  course: FinalCourseDetails | null
}

export function FocusedCourseModal({ isOpen, onClose, course }: FocusedCourseModalProps) {
  // Keyboard shortcuts
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scroll
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen, onClose])

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen || !course) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-background border border-border rounded-xl shadow-2xl max-w-7xl w-fit max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <ZoomedInPrereqs prerequisites={course.requirements?.prerequisites} />        
      </div>
    </div>
  )
}