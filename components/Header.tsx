import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getUser } from '@/auth/server';

const nav = [
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
  },
  {
    name: 'Login',
    href: '/login',
  },
  { 
    name: 'Signup',
    href: '/signup'
  }
];

export default async function Header() {
  const user = await getUser();

  return (
    <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-right justify-right">
          <div className="flex items-center space-x-6 sm:space-x-8 md:space-x-12">
            {nav.map((item) => {
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground",
                    
                  )}
                >
                
                  <span className="text-xs sm:text-none font-medium">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}