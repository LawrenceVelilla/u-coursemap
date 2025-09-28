"use client"

import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation'
import { loginAction, signUpAction } from "@/actions/users";


type Props = {
    type: 'login' | 'signup';

}

export function AuthForm({ type }: Props) {
    const router = useRouter();
    const isLoginForm = type === 'login';
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
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
                alert(`Error: ${errorMessage}`);
            } else {
                alert(`${title}: ${message}`);
                // Redirect after successful login or signup
                router.push('/');
                
            }
        });
    }



    return (
        <form action={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm mx-auto">
            <CardContent className="p-6">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
                    <Input type="email" id="email" name="email" placeholder="Enter your email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    disabled={isPending} />
                </div>
                <div className="mt-4 flex flex-col space-y-1.5">
                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
                    <Input type="password" id="password" name="password" placeholder="Enter your password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    disabled={isPending} />
                </div>        
            </CardContent>
            <CardFooter className="p-6 flex flex-col gap-6">
                <Button className="w-full">
                   {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : isLoginForm ? 'Login' : 'Sign Up'}
                </Button>
                <p className="text-sm text-center text-gray-600">
                    {isLoginForm ? "Don't have an account? Sign up" : "Already have an account? "}
                    <Link href={isLoginForm ? '/sign-up' : '/login'} className={cn("ml-1 font-medium text-primary hover:underline", isPending ? "pointer-events-none text-gray-400" : "")}>
                        {isLoginForm ? 'Sign up' : 'Log in'}
                    </Link>
                </p>
            </CardFooter>b
        </form>
    )
}
