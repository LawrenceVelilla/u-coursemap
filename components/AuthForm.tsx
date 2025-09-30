"use client"

import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { useTransition, useState } from "react";
import { Button } from "./ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation'
import { loginAction, signUpAction } from "@/actions/users";
import { loginSchema, signUpSchema } from "@/lib/validations";
import { z } from "zod";
import { CircleAlert } from "lucide-react";


type Props = {
    type: 'login' | 'signup';

}

export function AuthForm({ type }: Props) {
    const router = useRouter();
    const isLoginForm = type === 'login';
    const [isPending, startTransition] = useTransition();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            setErrors({});

            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            const confirmPassword = formData.get('confirmPassword') as string;

            const schema = isLoginForm ? loginSchema : signUpSchema;
            const data = isLoginForm
                ? { email, password }
                : { email, password, confirmPassword };

            try {
                schema.parse(data);
            } catch (error) {
                if (error instanceof z.ZodError) {
                    const fieldErrors: Record<string, string> = {};
                    error.errors.forEach((err) => {
                        if (err.path[0]) {
                            fieldErrors[err.path[0] as string] = err.message;
                        }
                    });
                    setErrors(fieldErrors);
                    return;
                }
            }

            let errorMessage;
            let title;
            let message;

            if (isLoginForm) {
                errorMessage = (await loginAction(email, password))?.error;
                title = 'Logged in';
                message = 'You have been successfully logged in.';
            } else {
                errorMessage = (await signUpAction(email, password))?.error;
                title = 'Account created';
                message = 'Your account has been successfully created.';
            }

            if (errorMessage) {
                setErrorMessage(errorMessage);
            } else {
                alert(`${title}: ${message}`);
                router.push('/');
            }
        });
    }



    return (
        <form action={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm mx-auto">
            <CardContent className="p-6">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
                    <Input type="email" id="email" name="email" placeholder="Enter your email" required
                    className={cn("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm", 
                        errors.email ? "border-red-600 pr-10 focus:border-red-600 focus:ring-red-600" : "border-gray-300"
                    )}
                    disabled={isPending} />
                    {errors.email && <p className="text-sm text-red-600 mt-1"><AlertCircle className="h-4 w-4"/>{errors.email}</p>}
                </div>
                <div className="mt-4 flex flex-col space-y-1.5">
                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
                    <Input type="password" id="password" name="password" placeholder="Enter your password" required
                    className={cn("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm",
                        errorMessage ? "border-red-600 pr-10 focus:border-red-600 focus:ring-red-600" : "border-gray-300"
                    )}
                    disabled={isPending} />
                    {!isLoginForm && errors.password && <p className="text-sm text-red-600 mt-1"><AlertCircle className="h-4 w-4"/>{errors.password}</p>}
                    {isLoginForm && errorMessage && <p className="text-sm text-red-600 flex items-center gap-1 mt-1"><CircleAlert className="h-4 w-4" />{errorMessage}</p>}
                </div>
                {!isLoginForm && (
                    <div className="mt-4 flex flex-col space-y-1.5">
                        <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </Label>
                        <Input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            className={cn(
                                "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm",
                                errors.confirmPassword ? "border-red-500" : "border-gray-300"
                            )}
                            disabled={isPending}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                                <AlertCircle className="h-4 w-4" />
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>
            )}      
            </CardContent>
            <CardFooter className="p-6 flex flex-col gap-6">
                <Button className="w-full">
                   {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : isLoginForm ? 'Login' : 'Sign Up'}
                </Button>
                <p className="text-sm text-center text-gray-600">
                    {isLoginForm ? "Don't have an account?" : "Already have an account? "}
                    <Link href={isLoginForm ? '/sign-up' : '/login'} className={cn("ml-1 font-medium text-primary hover:underline", isPending ? "pointer-events-none text-gray-400" : "")}>
                        {isLoginForm ? 'Sign up' : 'Log in'}
                    </Link>
                </p>
            </CardFooter>
        </form>
    )
}
