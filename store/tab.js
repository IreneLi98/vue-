import cookie from 'js-cookie'
// import router from '../router';
export default {
    state: {
        isCollapse: false,
        tabList: [{
            path: '/',
            name: 'home',
            label: '首页',
            icon: 'home'
        }, ],
        currentMenu: null,
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val;
                const result = state.tabList.findIndex(item => item.name === val.name);
                if (result === -1) {
                    state.tabList.push(val);
                }
            } else {
                state.currentMenu = null;
            }
        },
        closeTag(state, val) {
            const result = state.tabList.findIndex(item => item.name === val.name);
            state.tabList.splice(result, 1);
        },
        setMenu(state, val) {
            state.menu = val
            cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            cookie.remove('menu')
        },
        //addMenu里实现路由动态添加
        addMenu(state, router) {
            if (!cookie.get('menu')) {
                return
            }
            const menu = JSON.parse(cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                    if (item.children) {
                        item.children = item.children.map(item => {
                            item.component = () =>
                                import (`../views/${item.url}`)
                            return item
                        })
                        menuArray.push(...item.children)
                    } else {
                        item.component = () =>
                            import (`../views/${item.url}`)
                        menuArray.push(item)
                    }

                })
                //路由动态添加
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}