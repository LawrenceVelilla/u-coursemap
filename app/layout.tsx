import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from "@/providers/theme-provider"
import { QueryProvider } from "@/providers/query-provider"
import type { Viewport } from 'next';
import Header from "@/components/Header"
import '@/styles/globals.css';
import { Footer } from '@/components/ui/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: 'UCourseMap',
  description: 'University Course Planner for UofA students',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

type RootLayoutProps = {
  children: React.ReactNode;
};
 
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
            >
              <Header />
              <main className="flex-1 pt-6 md:pt-8">
                {children}
              </main>
              <Footer />
            </ThemeProvider>
          </QueryProvider>
        </body>
      </html>
    </>
  )
}
