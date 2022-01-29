import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Controller',
        component: () =>
            import(/* webpackChunkName: "controller" */ '../views/Controller.vue')
    },
    {
        path: '/widget',
        name: 'Widget',
        // route level code-splitting
        // this generates a separate chunk (widget.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "widget" */ '../views/Widget.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
