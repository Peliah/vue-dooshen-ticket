import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue')
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('@/views/AuthView.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/dashboard/tickets',
        name: 'Tickets',
        component: () => import('@/views/TicketsView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('@/views/ContactView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation guard for authentication
router.beforeEach((to, _from, next) => {
    const session = localStorage.getItem('ticketapp_session')

    if (to.meta.requiresAuth && !session) {
        next('/auth?mode=login')
    } else {
        next()
    }
})

export default router
