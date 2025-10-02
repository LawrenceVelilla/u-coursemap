import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader } from "@/components/ui/card";
import { AuthForm } from "@/components/AuthForm";

function SignUpPage() {
    return (
        <Card className="w-full max-w-md mx-auto mt-20 shadow-lg frosted-glass">
            <CardHeader>
                <CardTitle className="text-2xl text-center mb-4">Sign Up</CardTitle>
            </CardHeader>
            <AuthForm type="signup" />
        </Card>
    )
}

export default SignUpPage;