export default [
    {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search/Search.vue'),
    },
    {
        path: '/SearchCount',
        name: 'SearchCount',
        component: () => import('@/views/search/SearchCount.vue'),
    },
]