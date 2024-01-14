import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useConfigStore } from '@/stores/config'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: "/dashboard",
    component: () => import('@/layouts/default-layout/DefaultLayout.vue'),
    meta: {
      middleware: 'auth'
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: {
          pageTitle: 'Dashboard',
          breadcrumbs: ['Dashboards']
        }
      },
      {
        path: '/attendance',
        name: 'attendance',
        component: () => import('@/views/Attendance.vue'),
        meta: {
          pageTitle: 'Attendance',
          breadcrumbs: ['Attendance']
        }
      },
      {
        path: '/time-off',
        name: 'time-off',
        component: () => import('@/views/TimeOff.vue'),
        meta: {
          pageTitle: 'Time Off',
          breadcrumbs: ['Time Off']
        }
      },
      {
        path: '/reimbursement',
        name: 'reimbursement',
        component: () => import('@/views/Reimbursement.vue'),
        meta: {
          pageTitle: 'Reimbursement',
          breadcrumbs: ['Reimbursement']
        }
      },
      {
        path: '/over-time',
        name: 'over-time',
        component: () => import('@/views/OverTime.vue'),
        meta: {
          pageTitle: 'Overtime',
          breadcrumbs: ['Overtime']
        }
      },
      {
        path: '/salary',
        name: 'salary',
        component: () => import('@/views/Salary.vue'),
        meta: {
          pageTitle: 'Salary',
          breadcrumbs: ['Salary']
        }
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/Profile.vue'),
        meta: {
          pageTitle: 'Profile',
          breadcrumbs: ['Profile']
        }
      }
    ]
  },
  {
    path: '/',
    name: 'auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      {
        path: '/sign-in',
        name: 'sign-in',
        component: () => import('@/views/auth/SignIn.vue'),
        meta: {
          pageTitle: 'Sign In'
        }
      },
      {
        path: '/password-reset',
        name: 'password-reset',
        component: () => import('@/views/auth/PasswordReset.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/SystemLayout.vue'),
    children: [
      {
        // the 404 route, when none of the above matches
        path: '/404',
        name: '404',
        component: () => import('@/views/error/Error404.vue'),
        meta: {
          pageTitle: 'Error 404'
        }
      },
      {
        path: '/500',
        name: '500',
        component: () => import('@/views/error/Error500.vue'),
        meta: {
          pageTitle: 'Error 500'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]


const router = createRouter({
  end: undefined, sensitive: undefined, strict: undefined,
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        to: 80,
        behavior: 'smooth'
      }
    } else {
      return {
        top: 0,
        left: 0,
        behavior: 'smooth'
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const configStore = useConfigStore()

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`

  // reset config to initial state
  configStore.resetLayoutConfig()

  // verify auth token before each page change
  authStore.verifyAuth()

  // before page access check if page requires authentication
  if (to.meta.middleware == 'auth') {
    if (authStore.isAuthenticated) {
      next()
    } else {
      next({ name: 'sign-in' })
    }
  } else {
    next()
  }
})

export default router
