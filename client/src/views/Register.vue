<template>
  <div v-if="is500">
    <Error500 />
  </div>
  <div v-else>
    <div class="w-screen h-screen bg-black bg-center bg-cover bg-image" @mousemove="onMove">
      <div class="w-screen h-screen bg-black/50">
        <div class="w-[calc(100%-20px)] lg:w-[calc(100%-100px)] mx-auto">
          <ErrorMessage v-if="errorMessage.message" :errorMessage="errorMessage.message" />
          <div class="flex justify-center lg:justify-start">

            <img src="https://i.ibb.co/WtPHrz9/netflix-logo-png-2562-1.png" class="w-42 h-14 mt-6"
              alt="Almost Netflix Logo" />
          </div>
          <div class="flex items-start justify-center mt-40">
            <form class="w-full max-w-md p-8 bg-black rounded-md sm:p-14 bg-opacity-75">
              <h1 class="text-3xl font-bold text-white">Üye Ol</h1>
              <div class="flex flex-col my-6 space-y-4">
                <input v-model="state.user.first_name" required="required" class="input focus:outline-none focus:ring"
                  type="text" placeholder="Ad" />

                <input v-model="state.user.last_name" required="required" class="input focus:outline-none focus:ring"
                  type="text" placeholder="Soyad" />

                <input v-model="state.user.email" required="required" class="input focus:outline-none focus:ring"
                  type="email" placeholder="E-posta adresi" />

                <input v-model="state.user.password" required="required" class="input focus:outline-none focus:ring"
                  type="password" placeholder="Şifre" />

                <div>
                  <input v-model="state.user.verify" class="
                    float-left
                    w-5
                    h-5
                    mt-1
                    mr-2
                    align-top
                    transition
                    duration-200
                    bg-[#333333] bg-center bg-no-repeat bg-contain
                    border border-[#333333]
                    rounded-sm
                    appearance-none
                    cursor-pointer
                    checked:bg-[#e50914] checked:border-[#e50914]
                    focus:outline-none
                  " type="checkbox" value="" id="agree-terms" />

                  <svg xmlns="http://www.w3.org/2000/svg" class="
                    inline-block
                    w-4
                    h-4
                    text-[#333333]
                    -ml-[25px]
                    pointer-events-none
                  " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>

                  <label class="inline-block ml-1 text-zinc-500" for="agree-terms">
                    Kullanıcı sözleşmesini
                    <a href="/terms-and-conditions" target="_blank" class="text-white underline">kabul ediyorum</a>.
                  </label>
                </div>
              </div>
              <button type="submit" class="red-button" @click="onSave">
                <span v-if="!state.isLoading">Kayıt Ol</span>
                <svg v-if="state.isLoading" class="w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
              </button>
              <div class="mt-6">
                <p class="text-zinc-500">
                  Zaten Netflix'e Üye Misin?
                  <router-link :to="{ name: 'LoginPage' }" class="text-white hover:underline">Giriş Yap</router-link>.
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
import { inject, reactive, ref, watch, computed } from 'vue';
import { useRouter } from "vue-router"
import { useStore } from "vuex";
import ErrorMessage from '../components/ErrorPopup.vue'
import Error500 from "../components/500page.vue"
const appAxios = inject("appAxios")
const router = useRouter()
const store = useStore()
const state = reactive({
  user: {
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    verify: false
  },
  isLoading: false,
  isError: false,
})
const errorMessage = reactive({ message: null })

const is500 = computed(() => store.getters._isError)
const onSave = async () => {

  state.isLoading = true
  if (!state.user.verify) {
    errorMessage.message = "Kullanıcı sözleşmesini kabul etmelisin"
    state.isLoading = false
    return
  }



  await appAxios.post("/user/register", { ...state.user }).then((res) => {


    console.log(res.error)

    state.user = {


      first_name: null,
      last_name: null,
      email: null,
      password: null,
      verify: false,


    }



    router.push({ name: "LoginPage" })



  }).catch((e) => {

    if (e?.response) {
      state.isLoading = false
      console.log("EEEEE")
      errorMessage.message = e.response.data.message
      console.log(errorMessage.message)
      console.log(typeof (errorMessage.message))


    }
    if (e.message == "Network Error") {
      state.isLoading = false
      console.log("AAAA")
      is500.isa = true
      errorMessage.message = "Sistemde bir sorun oluştu lütfen daha sonra tekrar deneyin"
      store.commit("setError", true)
    }




  })


}


const onMove = () => {
  setTimeout(() => {
    errorMessage.message = null

  }, 8000);

}
</script>
<style scoped>
.bg-image {
  background-image: url('http://s3-us-west-2.amazonaws.com/techvibes/wp-content/uploads/2017/04/24135159/Netflix-Background.jpg');
}
</style>