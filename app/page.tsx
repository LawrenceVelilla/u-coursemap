"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Search from "@/components/Search"
import { CourseLoadingSkeleton } from "@/components/ui/courseskeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, MapPin, Users, Zap, ArrowRight, SearchIcon, Calendar } from "lucide-react"

function HomeContent() {
  const searchParams = useSearchParams()
  const courseCode = (searchParams.get("code") || "").replace("-", " ")

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance mb-4">
                Plan Your Academic
                <span className="block text-secondary mb-4">Journey</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance">
                Visualize course prerequisites, discover academic pathways, and plan your university experience with
                confidence.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search />
                
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Try searching for "CMPUT 201", "MATH 214", or any course code
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed to make course planning intuitive and comprehensive
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-6 h-6 " />
                </div>
                <h3 className="text-xl font-semibold mb-3">Visual Prerequisites</h3>
                <p className="text-muted-foreground leading-relaxed">
                  See the complete prerequisite chain for any course with interactive visual maps that make complex
                  requirements clear.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <SearchIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Search</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Find courses instantly with intelligent search that understands course codes, titles, and
                  descriptions.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Course Details</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Access comprehensive course information including credits, descriptions, and scheduling details.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Academic Planning</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Plan your semester schedule and degree progression with tools that understand your academic goals.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Student Community</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Connect with fellow students and share insights about courses and academic pathways.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-time Updates</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Stay current with the latest course offerings, requirement changes, and academic policies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How UCourseMap works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to master your academic planning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Search for Courses</h3>
              <p className="text-muted-foreground leading-relaxed">
                Enter any course code or browse by department to find the classes you're interested in taking.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Explore Prerequisites</h3>
              <p className="text-muted-foreground leading-relaxed">
                Visualize the complete prerequisite chain and understand what courses you need to take first.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Plan Your Path</h3>
              <p className="text-muted-foreground leading-relaxed">
                Create a strategic academic plan that aligns with your goals and graduation timeline.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}


export default function Home() {
  return (
    <Suspense fallback={<CourseLoadingSkeleton />}>
      <HomeContent />
    </Suspense>
  )
}
