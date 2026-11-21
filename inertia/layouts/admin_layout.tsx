import React, { type ReactNode } from 'react'
import { AppSidebar, type NavMenuGroup } from '~/components/app-sidebar'
import FlashToasts from '~/components/shared/flash_toasts'
import { Separator } from '~/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import {
  BookOpen,
  CalendarClock,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  School,
  Settings,
  Settings2,
  Users,
} from 'lucide-react'
import { usePage } from '@inertiajs/react'
import { getActiveState } from '~/lib/utils'
import PageBreadcrumbs from '~/components/shared/page_breadcrumbs'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { url } = usePage()

  const menus = React.useMemo<NavMenuGroup[]>(
    () => [
      {
        label: 'General',
        items: [
          {
            title: 'Overview',
            url: 'administrators.overview',
            icon: LayoutDashboard,
            isActive: getActiveState('administrators.overview', url),
          },
          {
            title: 'Announcements',
            url: 'home',
            icon: Megaphone,
          },
        ],
      },
      {
        label: 'Academic',
        items: [
          {
            title: 'Academic Years',
            url: 'administrators.academic_years.index',
            icon: CalendarClock,
            isActive: getActiveState('administrators.academic_years.index', url),
          },
          {
            title: 'Classes',
            url: 'home',
            icon: School,
            items: [
              { title: 'All Classes', url: 'home' },
              { title: 'Class Students', url: 'home' },
              { title: 'Class Subjects', url: 'home' },
            ],
          },
          {
            title: 'Subjects',
            url: 'administrators.subjects.index',
            icon: BookOpen,
            isActive: getActiveState('administrators.subjects.index', url),
          },
          {
            title: 'Learning',
            url: 'home',
            icon: GraduationCap,
            items: [
              { title: 'Materials', url: 'home' },
              { title: 'Assignments', url: 'home' },
              { title: 'Submissions', url: 'home' },
            ],
          },
          {
            title: 'Attendance',
            url: 'home',
            icon: ClipboardCheck,
            items: [
              { title: 'Sessions', url: 'home' },
              { title: 'Records', url: 'home' },
            ],
          },
        ],
      },
      {
        label: 'Users',
        items: [
          {
            title: 'User Management',
            url: 'administrators.students.index',
            icon: Users,
            items: [
              {
                title: 'Students',
                url: 'administrators.students.index',
                isActive: getActiveState('administrators.students.index', url),
              },
              {
                title: 'Teachers',
                url: 'administrators.teachers.index',
                isActive: getActiveState('administrators.teachers.index', url),
              },
              {
                title: 'Administrators',
                url: 'administrators.administrators.index',
                isActive: getActiveState('administrators.administrators.index', url),
              },
            ],
          },
        ],
      },
      {
        label: 'Programs',
        items: [
          {
            title: 'School Programs',
            url: 'administrators.overview',
            icon: Settings2,
            items: [
              {
                title: 'Extracurricular',
                url: 'administrators.extracurriculars.index',
                isActive: getActiveState('administrators.extracurriculars.index', url),
              },
              { title: 'Career', url: 'home' },
              { title: 'Alumni', url: 'home' },
              { title: 'E-Library', url: 'home' },
            ],
          },
        ],
      },
      {
        label: 'System',
        items: [
          {
            title: 'Reports & Grades',
            url: 'home',
            icon: FileText,
          },
          {
            title: 'Settings',
            url: 'home',
            icon: Settings,
          },
        ],
      },
    ],
    [url]
  )

  return (
    <>
      <SidebarProvider>
        <AppSidebar menus={menus} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <PageBreadcrumbs url={url} menus={menus} />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <FlashToasts />
    </>
  )
}
