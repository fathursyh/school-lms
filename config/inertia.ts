import { defineConfig } from '@adonisjs/inertia'

const inertiaConfig = defineConfig({
  /**
   * Server-side rendering options.
   */
  ssr: {
    /**
     * Toggle SSR mode for Inertia pages.
     */
    enabled: true,
    pages: (_, page) => {
      if (page.startsWith('dashboard/') || page.startsWith('admin/')) {
        return false
      }
      return true;
    },

    /**
     * Entry file used by the SSR server build.
     */
    entrypoint: 'inertia/ssr.tsx',
  },
})

export default inertiaConfig
