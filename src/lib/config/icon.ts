import type { IconConfig } from '$lib/types/icon'

export const icon: IconConfig = {
  favicon: {
    src: '/favicon.png',
    sizes: '32x32',
    type: 'image/png'
  },
  appleTouchIcon: {
    src: '/assets/any@180.png',
    sizes: '180x180',
    type: 'image/png'
  },
  any192: {
    src: '/assets/any@192.png',
    sizes: '192x192',
    type: 'image/png',
    purpose: 'any'
  },
  any512: {
    src: '/assets/any@512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'any'
  },
  maskable192: {
    src: '/assets/maskable@192.png',
    sizes: '192x192',
    type: 'image/png',
    purpose: 'maskable'
  },
  maskable512: {
    src: '/assets/maskable@512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'maskable'
  }
}
