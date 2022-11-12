export default [
    {
        path: '/message',
        name: 'message',
        component: () => import('@/views/information/InFormAtion.vue'),
        meta: { auth: true }
    },
    {
        path: '/forget',
        name: 'forget',
        component: () => import('@/views/information/ForgetPassword.vue'),
    },
]
