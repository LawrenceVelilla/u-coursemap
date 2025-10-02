import { prisma } from "@/db/client"

async function getCourses() {
  // First 20 courses
  const courses = await prisma.course.findMany({
    take: 20
  })
  return courses
}

export default async function CataloguePage() {
  const courses = await getCourses()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Course Catalogue</h1>
      <ul className="space-y-2">
        {courses.map((course) => (
          <li key={course.id} className="p-4 border rounded shadow-sm">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
} 