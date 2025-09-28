import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getUser } from '@/auth/server';
import { shadow } from '@/styles/utils';
import LogoutButton from './LogoutButton';
import { Button } from './ui/button';

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
    <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <style>
        {`
          header {
            box-shadow: ${shadow};
          }
        `}
      </style>
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Features navigation on the left */}
          <div className="flex items-center space-x-6 sm:space-x-8 md:space-x-12">
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

          {/* Auth navigation on the right */}
          {/* If screen is small/phone then only show login */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {user ? (
              <LogoutButton />
            ) : (
              <>
                <Button asChild variant="outline" className="hidden sm:inline-flex border border-primary hover:bg-primary hover:text-secondary w-fit">
                  <Link
                    href="/login"
                  >
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