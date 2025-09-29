import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";



export function Footer() {
    const linkedInUrl = "https://www.linkedin.com/in/lawrence-velilla-609646221/";
    const githubUrl = "https://github.com/LawrenceVelilla";
    const emailAddress = "vel.lawrence04@gmail.com";

    return (
        <footer className="w-full border-t bg-[#3F4F44] dark:background backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
                <p className="text-sm text-muted-foreground mb-4 md:mb-0">© {new Date().getFullYear()} UCourseMap. All rights reserved.</p>
                <div className="flex space-x-6">
                    <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className={cn("text-muted-foreground hover:text-primary transition-colors duration-150")}>
                        <Image src="../../public/linkedin.svg" alt="LinkedIn" width={24} height={24} className="h-6 w-6" />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={cn("text-muted-foreground hover:text-primary transition-colors duration-150")}>
                        <Image src="../../public/github.svg" alt="GitHub" width={24} height={24} className="h-6 w-6" />
                        <span className="sr-only">GitHub</span>
                    </a>
                </div>
            </div>
        </footer>
    );

}