<template>



    <div id="loading-animation"
        class="w-full h-screen flex flex-col items-center justify-center bg-rgba(0, 0, 0, 0.7) position-relative">
        <Vue3Lottie :animationData="netflixloadingJSON" :height="1000" :width="1000" :loop=false :onOnComplete="go" />
        <h1 className="mb-1 ml-4 flex-col  mt-20 font-mono text-4xl text-gray-100 md:text-6xl text">
            <span
                className="inline-flex text-red-700 h-20 pt-2 overflow-x-hidden animate-type group-hover:animate-type-reverse whitespace-nowrap text-brand-accent will-change-transform">
                NetflixClone
            </span>
            <span
                className="box-border inline-block w-1 h-10 ml-2 -mb-2 bg-white md:-mb-4 md:h-16 animate-cursor will-change-transform"></span>
        </h1>

        <span class="animate-waving-hand text-6xl">👋🏻</span>



    </div>

</template>
<script setup>
import { useRouter } from "vue-router";
import { Vue3Lottie } from 'vue3-lottie'
import netflixloadingJSON from '../assets/animations/netflix-loading.json'
import 'vue3-lottie/dist/style.css'
import { useStore } from "vuex";

const store = useStore()
const router = useRouter()
const go = () => {
    store.commit("logoutUser");
    store.commit("setOutToken")
    localStorage.clear()
    router.push({ name: "IndexPage" });

}

</script>
<style>
.text {
    font-family: 'Bebas';
}

.cursor::after {
    display: block;
    content: '';
    position: absolute;
    width: 4px;
    height: 100%;
    background-color: #fff;
    will-change: opacity;

}

@keyframes cursor {

    0%,
    40% {
        opacity: 1;
    }

    60%,
    100% {
        opacity: 0;
    }
}

@keyframes wave {
    0% {
        transform: rotate(0.0deg)
    }

    10% {
        transform: rotate(14.0deg)
    }

    20% {
        transform: rotate(-8.0deg)
    }

    30% {
        transform: rotate(14.0deg)
    }

    40% {
        transform: rotate(-4.0deg)
    }

    50% {
        transform: rotate(10.0deg)
    }

    60% {
        transform: rotate(0.0deg)
    }

    100% {
        transform: rotate(0.0deg)
    }
}

.will-change-transform {
    will-change: transform;
}
</style>