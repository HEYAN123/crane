const routeConfig = [
    {
        path: '',
        component: () => import('./components/layout'),
        children: [
            {
                path: '/',
                redirect: '/home',
            },
            {
                path: '/home',
                name: 'home',
                component: () => import("./pages/home"),
            }
        ],
    }
]

export default routeConfig;
