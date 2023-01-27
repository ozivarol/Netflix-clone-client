import { onMounted } from 'vue';
<template>
  <div class="w-screen h-screen bg-black bg-center bg-cover bg-image">
    <div class="w-screen h-screen bg-black/50">
      <div class="w-[calc(100%-20px)] lg:w-[calc(100%-100px)] mx-auto">
        <div class="flex justify-center lg:justify-start">
          <img src="https://i.ibb.co/WtPHrz9/netflix-logo-png-2562-1.png" class="w-40 pt-6" alt="Almost Netflix Logo" />
        </div>

        <div class="container mx-auto">
          <div class="
              flex flex-col
              items-center
              justify-center
              mt-12
              space-y-4
              text-center
            ">
            <h1 class="text-[100px] font-bold text-white font">Lé Netflix</h1>
            <p class="text-4xl text-zinc-100 font">Bim yapımı Netflix.</p>
          </div>

          <div class="
              flex flex-col
              w-full
              max-w-md
              mx-auto
              mt-10
              space-y-3
              sm:flex-row sm:space-y-0 sm:space-x-3
            ">
            <router-link :to="{ name: 'LoginPage' }" class="w-full"><button type="button" class="
                  rounded-md
                  w-full
                  font-bold
                  py-4
                  px-4
                  text-[#e50914]
                  bg-white
                  font
                ">
                Login
              </button></router-link>

            <router-link :to="{ name: 'RegisterPage' }" class="w-full"><button type="button" class="
                  rounded-md
                  w-full
                  font-bold
                  py-4
                  px-4
                  bg-[#e50914]
                  text-white
                  font
                ">
                Register!
              </button></router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { onMounted, inject } from 'vue';
import { useStore } from "vuex";
const appAxios = inject("appAxios")

const store = useStore();


onMounted(() => {

  store.commit("setLoading", true)
});

</script>
<style>
.bg-image {
  background-image: url('http://s3-us-west-2.amazonaws.com/techvibes/wp-content/uploads/2017/04/24135159/Netflix-Background.jpg');
}

.font {
  font-family: 'Bebas';
  font-weight: bold;

}
</style>