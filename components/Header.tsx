import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getUser } from '@/auth/server';
import { shadow } from '@/styles/utils';
import LogoutButton from './LogoutButton';
import { Button } from './ui/button';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';



const featuresNav = [
  {
    name: 'Search',
    href: '/search',
  },
  {
    name: 'Catalogue',
    href: '/catalogue',

  },
  {
    name: 'GPA Calculator',
    href: '/gpa-calculator',
  }
];

export default async function Header() {
  const user = await getUser()

  return (
    <header className="top-0 z-50 w-full border-b bg-[#3F4F44] dark:background backdrop-blur supports-backdrop-filter:bg-background/60">
      <style>
        {`
          header {
            box-shadow: ${shadow};
          }
        `}
      </style>
      <div className="container mx-auto px-4">
        <nav className="flex h-16 sm:h-16 items-center justify-between">
          {/* Logo and Features navigation on the left */}
          <div className="flex items-center space-x-6 sm:space-x-8 md:space-x-12">
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" alt="UCourseMap Logo" height={60} width={60} className="rounded-full overflow-hidden"/>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-6 md:space-x-8 lg:space-x-12">
              {featuresNav.map((item) => {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <span className="text-xs sm:text-sm font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Auth navigation and theme toggle on the right */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <ThemeToggle />
            {user ? (
              <LogoutButton />
            ) : (
              <>
                <Button asChild variant="outline" className="sm:inline-flex border border-primary hover:bg-primary hover:text-secondary w-fit">
                  <Link href="/login">
                    Login
                  </Link>
                </Button>
                <Button asChild variant="default" className="hidden sm:block border border-primary hover:bg-primary hover:text-secondary w-fit justify-center align-center">
                  <Link href="/sign-up">
                    Sign Up
                  </Link>
                </Button>
              </>
            )}

          </div>
        </nav>
      </div>
    </header>
  )
}