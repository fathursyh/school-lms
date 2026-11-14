import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { urlFor } from '~/client'
import { AppPath } from '~/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getActiveState(route: AppPath, url: string) {
  return url.startsWith(urlFor(route!))
}