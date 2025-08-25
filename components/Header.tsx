'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, BookOpen, Calculator, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const nav = [
  {
    name: 'Search',
    href: '/',
    icon: Search,
  },
  {
    name: 'Catalogue',
    href: '/catalogue',
    icon: BookOpen,
  },
  {
    name: 'GPA Calculator',
    href: '/gpa-calculator',
    icon: Calculator,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-right justify-right">
          <div className="flex items-center space-x-6 sm:space-x-8 md:space-x-12">
            {nav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive && "text-primary bg-primary/10"
                  )}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
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