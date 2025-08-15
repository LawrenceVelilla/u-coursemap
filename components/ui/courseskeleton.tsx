
import { Skeleton } from "./skeleton";

export function CourseLoadingSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Skeleton className="h-10 w-3/4 mb-4" />
      <Skeleton className="h-6 w-1/2 mb-2" />
      <Skeleton className="h-6 w-full mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
      <Skeleton className="h-6 w-full mt-4" />
    </div>
  );
}