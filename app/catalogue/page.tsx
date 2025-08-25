import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function CataloguePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="flex flex-col items-center space-y-12 w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">Course Catalogue</CardTitle>
            <CardDescription>
              Browse all available courses and departments
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}