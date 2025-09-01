import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CourseCardSkeleton() {
  return (
    <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none">
      <CardHeader className="pb-3 px-4 sm:px-6">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="h-5 sm:h-6 w-24 sm:w-28" />
            <Skeleton className="h-3 sm:h-4 w-full max-w-48" />
            <Skeleton className="h-3 sm:h-4 w-3/4" />
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="space-y-2">
          <Skeleton className="h-3 sm:h-4 w-full" />
          <Skeleton className="h-3 sm:h-4 w-full" />
          <Skeleton className="h-3 sm:h-4 w-2/3" />
        </div>
      </CardContent>
    </Card>
  )
}