'use client'

// import { useState } from 'react'
// import { CourseGrid } from '@/components/CourseGrid'
// import { CourseSearchInput } from '@/components/CourseSearchInput'

// export default function CataloguePage() {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [submittedQuery, setSubmittedQuery] = useState('')

//   const handleSearch = (query: string) => {
//     // Immediate visual filtering
//     setSearchQuery(query)
//   }

//   const handleSubmit = (query: string) => {
//     // Submitted search (would update URL in real implementation)
//     setSubmittedQuery(query)
//     setSearchQuery(query)
//     console.log('Search submitted:', query)
//   }

//   const handleCourseClick = (courseCode: string, department: string) => {
//     // Course click handler (would navigate to course details)
//     console.log('Course clicked:', { courseCode, department })
//     alert(`Course clicked: ${courseCode} (${department})`)
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto py-8 space-y-8">
//         <div className="text-center space-y-4">
//           <h1 className="text-4xl font-bold tracking-tight">Course Catalogue</h1>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Browse and search through all available courses. Test the infinite scroll and search functionality.
//           </p>
//         </div>

//         <div className="max-w-2xl mx-auto">
//           <CourseSearchInput
//             onSearch={handleSearch}
//             onSubmit={handleSubmit}
//             placeholder="Search courses by code, title, or department..."
//           />
//         </div>

//         <div className="text-center space-y-2">
//           <p className="text-sm text-muted-foreground">
//             Current search: <strong>{searchQuery || 'None'}</strong>
//           </p>
//           <p className="text-sm text-muted-foreground">
//             Submitted search: <strong>{submittedQuery || 'None'}</strong>
//           </p>
//         </div>

//         <CourseGrid
//           searchQuery={searchQuery}
//           onCourseClick={handleCourseClick}
//         />
//       </div>
//     </div>
//   )
// }
export default function CataloguePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Course Catalogue</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse and search through all available courses. Catalogue coming soon!
          </p>
        </div>
        <div className="text-center py-20">
          <p className="text-lg font-medium mb-2">Catalogue Coming Soon!</p>
          <p className="text-sm text-muted-foreground">
            working hard on full course catalogue.
          </p>
        </div>
      </div>
    </div>
  )
} 