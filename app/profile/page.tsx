import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="flex flex-col items-center space-y-12 w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">Profile</CardTitle>
            <CardDescription>
              View your saved courses and GPAs
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mt-4">
              Sign in or sign up to save courses and track your progress.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}