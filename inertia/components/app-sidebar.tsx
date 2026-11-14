import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from "lucide-react"

import { NavMenu, type NavMenuItem } from "inertia/components/nav-menu"
import { NavUser } from "inertia/components/nav-user"
import { TeamSwitcher } from "inertia/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "inertia/components/ui/sidebar"

export type { NavMenuItem }

export interface NavMenuGroup {
  label?: string
  items: NavMenuItem[]
}

const defaultData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
}

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  menus?: NavMenuGroup[]
  navMenu?: NavMenuItem[]
  menuLabel?: string
  user?: {
    name: string
    email: string
    avatar: string
  }
  teams?: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}

export function AppSidebar({
  menus,
  navMenu,
  menuLabel,
  user = defaultData.user,
  teams = defaultData.teams,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        {menus
          ? menus.map((group, index) => (
              <NavMenu
                key={group.label ?? index}
                label={group.label}
                items={group.items}
              />
            ))
          : navMenu && <NavMenu label={menuLabel} items={navMenu} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
