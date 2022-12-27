import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import { reactive } from "vue";
var ls = new SecureLS({ isCompression: false });

export default createStore({
    state: {
        user: null,
        saltKey: "netflixclone",
        token: null,
        is500: false,
        isLoading: false

    },

    mutations: {
        setUser(state, user) {

            state.user = user
            console.log(state.user)
        },
        logoutUser(state) {
            state.user = null
        },
        SET_ERROR(state, error) {
            state.error = error;
        },
        setToken(state, token) {
            state.token = token
        },
        setOutToken(state) {
            state.token = null
        },
        setError(state, is500) {
            state.is500 = is500
        },
        setOutError(state) {
            state.is500 = false
        },
        setLoading(state, loading) {
            state.isLoading = loading
        },
        setOutLoading(state) {
            state.isLoading = false
        }

    },
    getters: {
        _isAuthenticated: state => state.user !== null,
        _getCurrentUser(state) {
            const user = state.user;
            delete user?.password
            return user
        },
        _saltKey: state => state.saltKey,
        _isError: state => { return state.is500 },
        _isLoading: state => { return state.isLoading }
    },
    actions: {
        setError(context, error) {
            context.commit('SET_ERROR', error);
        },

    },
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: key => ls.remove(key)
            }
        })
    ]
})