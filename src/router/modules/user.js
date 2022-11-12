export default [
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/login/Register.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/Login.vue'),
    },
]


