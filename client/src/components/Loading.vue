<template>
    <div id="loading-animation" class="w-full h-screen flex flex-col items-center justify-center bg-black">
        <Vue3Lottie :animationData="netflixloadingJSON" :height="1000" :width="1000" :loop=false :onOnComplete="go" />
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import store from '../store';
import { Vue3Lottie } from 'vue3-lottie'
import netflixloadingJSON from '../assets/animations/netflix-animation.json'
import 'vue3-lottie/dist/style.css'


const router = useRouter()

const go = () => {
    console.log("ÇALIŞTIM")
    console.log(store.getters._isAuthenticated)
    store.commit("setLoading", true)
    if (store.getters._isAuthenticated) {
        router.push({ name: "HomePage" });
    }

}



</script>
