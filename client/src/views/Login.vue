<template>
  <div v-if="is500">
    <Error500 />
  </div>
  <div v-else-if="!isLoading">
    <Loading />
  </div>
  <div v-else>
    <div class="w-screen h-screen bg-black bg-center bg-cover bg-image" @mousemove="onMove">
      <div class="w-screen h-screen bg-black/50">
        <div class="w-[calc(100%-20px)] lg:w-[calc(100%-100px)] mx-auto">
          <div class="flex justify-center lg:justify-start">
            <img src="https://i.ibb.co/WtPHrz9/netflix-logo-png-2562-1.png" class="w-42 h-14 mt-6"
              alt="Almost Netflix Logo" />
          </div>
          <ErrorMessage v-if="errorMessage.message" :errorMessage="errorMessage.message" />
          <div class="flex items-start justify-center mt-40">

            <form class="w-full max-w-md p-8 bg-black rounded-md sm:p-14 bg-opacity-75 relative">


              <h1 class="text-3xl font-bold text-white">Giriş Yap</h1>

              <div class="flex flex-col my-6 space-y-4">
                <input v-model="userData.email" required="required" class="input focus:outline-none focus:ring"
                  type="email" placeholder="E-posta" />

                <input v-model="userData.password" required="required" class="input focus:outline-none focus:ring"
                  type="password" placeholder="Şifre" />
              </div>
              <button @click="onSubmit" type="submit" class="
               red-button
              ">
                <span>Giriş Yap</span>

              </button>
              <div class="mt-6">
                <p class="text-zinc-500">
                  Şimdi Netflix Hesabı
                  <router-link :to="{ name: 'RegisterPage' }" class="text-white hover:underline">
                    oluştur!
                  </router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>

  </div>


</template>
<script setup>
import ErrorMessage from '../components/ErrorPopup.vue'
import Error500 from "../components/500page.vue"
import Loading from "../components/Loading.vue"
import { inject, ref, watch, reactive, computed, onMounted } from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const appAxios = inject("appAxios")
const store = useStore()
const router = useRouter()
const userData = ref({
  email: null,
  password: null
})

const is500 = computed(() => store.getters._isError)
const isLoading = computed(() => store.getters._isLoading)
const a = store.getters._isLoading

const errorMessage = reactive({ message: null })

console.log(store.getters._isAuthenticated)
const onSubmit = async () => {
  try {
    await appAxios.post("/user/login", { ...userData.value }).then(res => {


      const { email } = res.data.data

      if (res?.data) {
        store.commit("setUser", email)
        store.commit("setLoading", false)


      }
    }).catch((e) => {



      if (e?.response) {
        errorMessage.message = e.response.data.message
      }
      if (e.message == "Network Error") {
        errorMessage.message = "Sistemde bir sorun oluştu lütfen daha sonra tekrar deneyin"
        store.commit("setError", true)

      }

    })

  } catch (error) {
    errorMessage.message = "Server bağlantısı koptu"
    store.commit("setError", true)
  }

}



const onMove = () => {
  setTimeout(() => {
    errorMessage.message = null

  }, 9000);

}




</script>

<style scoped>
.bg-image {
  background-image: url('https://www.pazarlamasyon.com/wp-content/uploads/2019/10/Netflix-4.jpg');
}
</style>