import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/homePage.vue'
import upperBar from '@/components/upperBar.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',       // ✅ : not =
        name: 'home',
        component: HomePage
    }]
})

export default router