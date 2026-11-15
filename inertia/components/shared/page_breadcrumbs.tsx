import React from "react";
import { NavMenuGroup } from "../app-sidebar";
import { urlFor } from "~/client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Link } from "lucide-react";

export default function PageBreadcrumbs({ url, menus }: { url: string, menus: NavMenuGroup[] }) {
  const breadcrumbsData = React.useMemo(() => {
    const pathname = url.split('?')[0]
    const formatSegment = (segment: string) =>
      segment
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())

    const appendExtraSegments = (
      basePath: string,
      crumbs: { label: string; href?: string }[]
    ) => {
      if (pathname === basePath || !pathname.startsWith(basePath + '/')) {
        return crumbs
      }
      const rest = pathname.slice(basePath.length + 1).split('/').filter(Boolean)
      let currentPath = basePath
      for (const segment of rest) {
        currentPath += `/${segment}`
        crumbs.push({ label: formatSegment(segment), href: currentPath })
      }
      return crumbs
    }

    for (const group of menus) {
      for (const item of group.items) {
        if (item.items && item.items.length > 0) {
          for (const sub of item.items) {
            if (!sub.url || sub.url === 'home') continue
            const subPath = urlFor(sub.url)
            if (sub.isActive || pathname === subPath || pathname.startsWith(subPath + '/')) {
              return appendExtraSegments(subPath, [
                { label: item.title },
                { label: sub.title, href: subPath },
              ])
            }
          }
          continue
        }

        if (!item.url || item.url === 'home') continue
        const itemPath = urlFor(item.url)
        if (item.isActive || pathname === itemPath || pathname.startsWith(itemPath + '/')) {
          return appendExtraSegments(itemPath, [{ label: item.title, href: itemPath }])
        }
      }
    }

    const segments = pathname.split('/').filter(Boolean).filter((s) => s !== 'administrators')
    let currentPath = '/administrators'
    return segments.map((segment) => {
      currentPath += `/${segment}`
      return { label: formatSegment(segment), href: currentPath }
    })
  }, [url, menus])

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbsData.map((crumb, index) => {
          const isLast = index === breadcrumbsData.length - 1
          return (
            <React.Fragment key={`${crumb.label}-${index}`}>
              <BreadcrumbItem className={isLast ? undefined : 'hidden md:block'}>
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : crumb.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <span className="text-muted-foreground">{crumb.label}</span>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}