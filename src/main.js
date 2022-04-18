import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '../router'
import './assets/less/index.less'
import store from '../store/index'
import axios from 'axios'
import '../api/mock'
Vue.use(ElementUI);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    store.commit('getToken')
    const token = store.state.user.token;
    if (!token && to.name !== 'login') {
        next({
            name: 'login'
        })

    } else if (token && to.name === 'login') {
        next({
            name: 'home'
        })
    } else {
        next()
    }
})
new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        store.commit('addMenu', router)
    }
}).$mount('#app')
Vue.prototype.axios = axios;