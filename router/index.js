import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);



const routes = [{
        path: '/',
        name: 'Main',
        component: () =>
            import ('../views/Main.vue'),
        redirect: '/home',
        children: [
            // {
            //         path: '/home',
            //         name: 'home',
            //         component: () =>
            //             import ('../views/Home/index')
            //     }, {
            //         path: '/user',
            //         name: 'user',
            //         component: () =>
            //             import ('../views/User/index')
            //     },
            //     {
            //         path: '/mall',
            //         name: 'mall',
            //         component: () =>
            //             import ('../views/Mall/mall.vue')
            //     }, {
            //         path: '/page1',
            //         name: 'page1',
            //         component: () =>
            //             import ('../views/Others/pageOne.vue')
            //     }, {
            //         path: '/page2',
            //         name: 'page2',
            //         component: () =>
            //             import ('../views/Others/pageTwo.vue')
            //     },
            // 
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Login/index.vue')
    }

]
const router = new VueRouter({
    routes,
    mode: 'history'
})
const VueRouterPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(to) {

    return VueRouterPush.call(this, to).catch(err => err)

}
export default router