export default [
    {
        path: '/MyPublish',
        name: 'MyPublish',
        component: () => import('@/views/myUtils/MyPublish.vue'),
        meta: { auth: true }
    },
    {
        path: '/collect',
        name: 'collect',
        component: () => import('@/views/myUtils/MyCollect.vue'),
        // meta: { auth: true }
    },

]