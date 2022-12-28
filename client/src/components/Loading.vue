<template>
    <div id="loading-animation" class="w-full h-screen flex flex-col items-center justify-center bg-black"></div>
</template>

<script>
import { onMounted, watchEffect } from 'vue';
import lottie from 'lottie-web';
import { useRouter } from "vue-router";
import store from '../store';

export default {
    setup() {
        const router = useRouter()


        onMounted(() => {
            // Lottie animasyonunu yükle
            const animation = lottie.loadAnimation({
                container: document.getElementById('app').querySelector('#loading-animation'), // Animasyonu gösterecek element
                renderer: 'svg', // Animasyonu render etmek için kullanılacak teknoloji
                loop: false, // Animasyonu sürekli oynat
                autoplay: true, // Animasyonu otomatik oynat
                path: './src/assets/animations/netflix-animation.json' // Animasyon dosyasının yolu
            });

            // Animasyon tamamlandıktan sonra yapılacak işlemler
            animation.addEventListener('complete', () => {
                console.log(store.getters._isAuthenticated)
                store.commit("setLoading", true)
                if (store.getters._isAuthenticated) {
                    router.push({ name: "HomePage" });

                }

            });
        });



    }
};
</script>
