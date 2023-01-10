import type { VerticalNavItems } from '@/@layouts/types'

export default [
  {
    title: 'Search Questions',
    to: { name: 'search' },
    icon: { icon: 'mdi-magnify' },
  },
  {
    title: 'Generate MCQ',
    to: { name: 'generate' },
    icon: { icon: 'mdi-format-list-group-plus' },
  },
  {
    title: 'Evaluate MCQ',
    to: { name: 'evaluate' },
    icon: { icon: 'mdi-account-star' },
  },
  {
    title: 'Admin',
    to: { name: 'admin' },
    icon: { icon: 'mdi-cog' },
  },
] as VerticalNavItems
