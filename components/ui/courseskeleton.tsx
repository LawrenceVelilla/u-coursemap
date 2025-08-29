
import { Skeleton } from "./skeleton";
import { Card } from "./card";

export function CourseLoadingSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid gap-4 
          grid-cols-1 
          md:grid-cols-2 
          lg:grid-cols-4 lg:grid-rows-4 lg:grid-flow-col-dense">
        
        {/* Prerequisites - Left tall card */}
        <Card className="frosted-glass col-span-1 lg:row-span-2 h-[35rem] md:h-auto lg:h-[35rem] animate-pulse">
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="space-y-2 pt-4">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>
        </Card>
        
        {/* Course Information - Top right large card */}
        <Card className="frosted-glass col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-3 lg:col-span-2 h-[17rem] md:h-auto lg:h-[17rem] animate-pulse">
          <div className="p-6 space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </Card>
        
        {/* Needed By - Right tall card */}
        <Card className="frosted-glass col-span-1 md:row-start-1 lg:row-start-1 lg:row-span-2 h-[35rem] md:h-auto lg:h-[35rem] animate-pulse">
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="space-y-2 pt-4">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>
        </Card>
        
        {/* Corequisites - Bottom left small card */}
        <Card className="frosted-glass col-span-1 lg:col-start-3 lg:row-start-2 h-[17rem] md:h-auto lg:h-[17rem] animate-pulse">
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </Card>
        
        {/* Other Info - Bottom right small card */}
        <Card className="frosted-glass col-span-1 lg:col-start-4 lg:row-start-2 h-[17rem] md:h-auto lg:h-[17rem] animate-pulse">
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </Card>
      </div>
    </div>
  );
}