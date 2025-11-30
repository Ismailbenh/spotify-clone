import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/homePage.vue'
import songPage from '@/pages/songPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/song/:id', 
            name: 'song',
            component: songPage,
            props: true  
        },
    ]
})

export default router