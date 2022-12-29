
import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue"
import Home from "@/views/Home.vue"
import Index from "@/views/index.vue"
import ShowsComponent from "@/views/Shows.vue";
import MoviesComponent from "@/views/Movies.vue";
import PopularComponent from "@/views/Popular.vue";
import SearchComponent from "@/views/Search.vue";
import VideoComponent from "@/views/Video.vue";
import AccountComponent from "@/views/Account.vue"
import store from "../store";
const routes = [
    {
        name: "LoginPage",
        path: "/login",
        component: Login
    },
    {
        name: "RegisterPage",
        path: "/register",
        component: Register
    },
    {
        name: "HomePage",
        path: "/home",
        component: Home
    },
    {
        name: "IndexPage",
        path: "/",
        component: Index
    },
    {
        path: "/shows",
        name: "Shows",
        component: ShowsComponent,
    },
    {
        path: "/movies",
        name: "Movies",
        component: MoviesComponent,
    },
    {
        path: "/popular",
        name: "Popular",
        component: PopularComponent,
    },
    {
        path: "/search",
        name: "search",
        component: SearchComponent,
        props: (route) => ({ query: route.query.q }),
    },
    {
        path: "/video/:id",
        name: "video",
        component: VideoComponent,

    },
    {
        path: "/account",
        name: "AccountPage",
        component: AccountComponent,

    },

    { path: "/:pathMatch(.*)*", redirect: "/" },
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
    mode: 'history'
})
router.beforeEach(async (to, _, next) => {
    const authRequiredRoutes = ["HomePage", "Shows", "Movies", "search", "video", "AccountPage"];
    const authNotRequiredRoutes = ["LoginPage", "RegisterPage", "IndexPage"];
    const _isAuthenticated = store.getters._isAuthenticated;

    if (authNotRequiredRoutes.includes(to.name) && _isAuthenticated) {
        next({ name: 'HomePage' })
    } else if (authRequiredRoutes.includes(to.name) && !_isAuthenticated) {
        next({ name: 'LoginPage' })
    } else {
        next()
    }
});


export default router