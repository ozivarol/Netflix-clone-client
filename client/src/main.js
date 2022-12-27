import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import router from "./router"
import store from './store'
import { appAxios } from './utils/appAxios'

const app = createApp(App);
app.use(router)
app.use(store)
app.provide("appAxios", appAxios)
app.mount("#app")

