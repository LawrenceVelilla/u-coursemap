import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import { ThemeProvider } from "@/providers/theme-provider"
import { QueryProvider } from "@/providers/query-provider"
import type { Viewport } from 'next';
import Header from "@/components/Header"
import '@/styles/globals.css';
import { Footer } from '@/components/ui/footer';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})


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
      <html lang="en" suppressHydrationWarning className={`${sora.variable} ${inter.variable}`}>
        <head />
        <body className={`antialiased flex flex-col min-h-screen`}>
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
