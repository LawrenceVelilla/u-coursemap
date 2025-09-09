"use client";

import { Label } from "@radix-ui/react-label";
import { CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

type Props = {
    type: 'login' | 'signup';

}

export function AuthForm({ type }: Props) {
    const isLoginForm = type === 'login';

    const handleSubmit = (formData: FormData) => {
        console.log("form submitted");
    }

    const [isPending, startTransition] = useTransition();

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
            <CardFooter className="p-6">
                <Button>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : isLoginForm ? 'Login' : 'Sign Up'}
                </Button>
            </CardFooter>
        </form>
    )
}