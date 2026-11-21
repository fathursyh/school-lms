import { Link } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Calendar,
  FlaskConical,
  GraduationCap,
  LogIn,
  Music,
  Newspaper,
  Trophy,
  Users,
} from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import MainLayout from '~/layouts/main_layout'

const schoolName = import.meta.env.VITE_SCHOOL || 'Oakridge High School'

const posts = [
  {
    id: 1,
    category: 'Academic',
    date: 'Nov 12, 2026',
    title: 'Midterm Examination Schedule Released',
    excerpt:
      'Students can now view room assignments and exam timetables for the 2026 Odd Semester in the student portal.',
  },
  {
    id: 2,
    category: 'Achievement',
    date: 'Nov 8, 2026',
    title: 'Science Olympiad Team Advances to Nationals',
    excerpt:
      'Congratulations to our Physics and Chemistry delegates for placing first in the regional competition.',
  },
  {
    id: 3,
    category: 'Campus',
    date: 'Nov 3, 2026',
    title: 'University & Career Fair 2026',
    excerpt:
      'Meet admissions representatives and explore scholarship opportunities this Friday at the main auditorium.',
  },
]

const extracurriculars = [
  {
    title: 'Science & Robotics Club',
    schedule: 'Tue & Thu • 15:30',
    description: 'Hands-on STEM projects, coding, and regional olympiad preparation.',
    icon: FlaskConical,
  },
  {
    title: 'Varsity Athletics',
    schedule: 'Mon, Wed, Fri • 16:00',
    description: 'Basketball, futsal, and track teams building teamwork and sportsmanship.',
    icon: Trophy,
  },
  {
    title: 'Music & Choir',
    schedule: 'Wed • 15:30',
    description: 'Instrumental ensemble and vocal training for school ceremonies and festivals.',
    icon: Music,
  },
  {
    title: 'Student Council (OSIS)',
    schedule: 'Fri • 15:00',
    description: 'Student leadership, campus events, and community service initiatives.',
    icon: Users,
  },
]

export default function Home() {
  return (
    <>
      <Head title={'Home'} />

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Top Navigation */}
        <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-10">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <Link route="home" className="flex items-center gap-2 font-semibold tracking-tight">
              <GraduationCap className="size-6 text-primary" />
              <span>{schoolName}</span>
            </Link>

            <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
              <a href="#posts" className="hover:text-foreground transition-colors">
                Posts
              </a>
              <a href="#extracurriculars" className="hover:text-foreground transition-colors">
                Extracurriculars
              </a>
              <Link route="public.extracurriculars.index" className="hover:text-foreground transition-colors">
                All Programs
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Button asChild size="sm">
                <Link route="session.create">
                  <LogIn />
                  LMS Login
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="border-b bg-muted/30">
            <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
              <div className="max-w-2xl space-y-6">
                <Badge variant="secondary" className="font-normal">
                  Academic Year 2026 • Excellence in Learning & Character
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Welcome to {schoolName}
                </h1>
                <p className="text-base text-muted-foreground sm:text-lg">
                  Empowering high school students with strong academics, supportive mentorship,
                  and vibrant campus life. Access digital learning resources or explore student
                  programs below.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button asChild size="lg">
                    <a href="#e-library">
                      <BookOpen className="mr-2 size-4" />
                      Open E-Library
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href="#careers">
                      <Briefcase className="mr-2 size-4" />
                      Careers Resources
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* School Posts / Announcements */}
          <section id="posts" className="mx-auto max-w-6xl px-6 py-14">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Newspaper className="size-4" />
                  <span>School News</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Latest Posts & Announcements</h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <Card key={post.id} className="flex flex-col justify-between">
                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="size-3" />
                        {post.date}
                      </span>
                    </div>
                    <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Extracurriculars */}
          <section id="extracurriculars" className="border-t bg-muted/20">
            <div className="mx-auto max-w-6xl px-6 py-14">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-primary">Student Life</p>
                  <h2 className="text-2xl font-bold tracking-tight">Extracurricular Programs</h2>
                  <p className="text-sm text-muted-foreground">
                    Discover clubs, sports, and organizations outside the classroom.
                  </p>
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link route="public.extracurriculars.index">
                    View all programs
                    <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {extracurriculars.map((club) => (
                  <Card key={club.title}>
                    <CardHeader className="space-y-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <club.icon className="size-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{club.title}</CardTitle>
                        <p className="mt-1 text-xs text-muted-foreground">{club.schedule}</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">{club.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-background">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
            <span>© {new Date().getFullYear()} {schoolName}. All rights reserved.</span>
            <span>High School Learning Management System</span>
          </div>
        </footer>
      </div>
    </>
  )
}

Home.layout = [MainLayout]
