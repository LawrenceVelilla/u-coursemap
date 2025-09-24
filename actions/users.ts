"use server";

import { prisma } from "../db/client";
import { createClient } from "@/auth/server";

export const loginAction = async (email: string, password: string) => {
    try { 
        const { auth } = await createClient();
        const { error } = await auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error("Login error:", error.message);
            return { error: error.message };
        }

        return { error: null };     
    }
    catch (error) {
        console.error("Unexpected error during login:", error);
        return { error: 'Unexpected error during login' };
    }
};

export const logoutUser = async () => {
    try {
        const { auth } = await createClient();
        const { error } = await auth.signOut();

        if (error) {
            console.error("Logout error:", error.message);
            return { error: error.message };
        }

        return { error: null };
    } catch (error) {
        console.error("Unexpected error during logout:", error);
        return { error: 'Unexpected error during logout' };
    }
};

export const signUpAction = async (email: string, password: string) => {
    try {
        const { auth } = await createClient();
        const { data, error } = await auth.signUp({
            email,      
            password,
        });

        if (error) {
            console.error("Sign-up error:", error.message);
            return { error: error.message };
        }

        const userId = data.user?.id;
        if (!userId) throw new Error("Error Signup")

        // Add user to database
        return { error: null };
    } catch (error) {
        console.error("Unexpected error during sign-up:", error);
        return { error: 'Unexpected error during sign-up' };
    }
};