import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: 'sessions' },
      {
        path: 'sessions',
        component: () => import('src/pages/sessions/index.vue'),
      },
      {
        path: 'sessions/:id',
        component: () => import('src/pages/sessions/edit-session/index.vue'),
        meta: {
          fullscreen: true,
        },
      },
      {
        path: 'history',
        component: () => import('src/pages/history/index.vue'),
      },
      {
        path: 'progress',
        component: () => import('src/pages/progress/index.vue'),
      },
      {
        path: 'workouts',
        component: () => import('src/pages/workouts/index.vue'),
      },
      {
        path: 'workouts/:id',
        component: () => import('src/pages/workouts/edit-workout/index.vue'),
        meta: {
          fullscreen: true,
        },
      },
      {
        path: 'settings',
        component: () => import('src/pages/settings/index.vue'),
        meta: {
          fullscreen: true,
        },
      },
      {
        path: 'exercises',
        component: () => import('src/pages/exercises/index.vue'),
        meta: {
          fullscreen: true,
        },
      },
      {
        path: 'exercises/:id',
        component: () => import('src/pages/exercises/edit-exercise/index.vue'),
        meta: {
          fullscreen: true,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
