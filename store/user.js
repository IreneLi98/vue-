import cookie from 'js-cookie'
export default {
    state: {
        token: '',
    },
    mutations: {
        setToken(state, val) {
            state.token = val;
            cookie.set('token', val)
        },
        clearToken(state) {
            state.token = '';
            cookie.remove('token')
        },
        getToken(state) {
            state.token = state.token || cookie.get('token')
        }

    }
}