import { Card, CardTitle, CardHeader } from "@/components/ui/card";
import { AuthForm } from "@/components/AuthForm";

function LoginPage() {
    return (
        <Card className="w-full max-w-md mx-auto mt-20 shadow-lg frosted-glass">
            <CardHeader>
                <CardTitle className="text-2xl text-center mb-4">Login</CardTitle>
            </CardHeader>
            <AuthForm type="login" />
        </Card>
    )
}

export default LoginPage;