import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export default function GpaCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="flex flex-col items-center space-y-12 w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Calculator className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">GPA Calculator</CardTitle>
            <CardDescription>
              Calculate grade point average
            </CardDescription>
          </CardHeader>          
        </Card>
      </div>
    </div>
  );
}