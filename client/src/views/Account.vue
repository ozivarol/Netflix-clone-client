<template>
    <div v-if="isLoading">
        <ExitAnimationVue />
    </div>
    <div v-else>
        <Header />

        <main class="profile-page">
            <section class="relative block" style="height: 500px;">
                <div class="absolute top-0 w-full h-full bg-center bg-cover"
                    style='background-image: url("https://r4.wallpaperflare.com/wallpaper/304/507/770/league-of-legends-arcane-jinx-league-of-legends-hd-wallpaper-bb86acad33e1bfa96504eb699decec70.jpg");'>
                    <span id="blackOverlay" class="w-full h-full absolute opacity-50 bg-black"></span>
                </div>
                <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                    style="height: 70px;">
                    <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon class="text-gray-300 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </section>
            <section class="relative py-16 bg-gray-300">
                <div class="container mx-auto px-4">
                    <div
                        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div class="px-6">
                            <div class="flex flex-wrap justify-center">
                                <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div class="relative">
                                        <img alt="..." src="../components/netflix.gif"
                                            class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                                            style="max-width: 150px;" />
                                    </div>
                                </div>
                                <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div class="py-6 px-3 mt-32 sm:mt-0">
                                        <button @click="deleteProfile"
                                            class="bg-red-800 active:bg-red-500  uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                            type="button" style="transition: all 0.15s ease 0s;">
                                            Delete Account
                                        </button>
                                        <button
                                            class="bg-red-800 active:bg-red-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                            type="button" style="transition: all 0.15s ease 0s;">
                                            Change Password
                                        </button>

                                    </div>
                                </div>
                            </div>
                            <div class="text-center mt-12">
                                <h3 class="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                                    {{ state.name }} {{ state.surname }}
                                </h3>
                                <div class="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                                    <i class="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>
                                    {{ state.locationCity }}, {{ state.locationCountry }}
                                </div>
                                <div class="mb-2 text-gray-700 mt-10">
                                    <i class="fas fa-calendar mr-2 text-lg text-gray-500"></i>Hesap Oluşturma Tarihi -
                                    {{
                                        state.createDate
                                    }}
                                </div>
                                <div class="mb-2 text-gray-700">
                                    <i class="fa fa-reply mr-2 text-lg text-gray-500"></i>Son Değişiklik Zamanı - {{
                                        state.updateDate
                                    }}
                                </div>
                                <div class="mb-2 text-gray-700">
                                    <i class="fa fa-server mr-2 text-lg text-gray-500"></i>Ip Adress - {{
    state.ip
                                    }}
                                </div>
                            </div>
                            <div class="mt-10 py-10 border-t border-gray-300 text-center">
                                <div class="flex flex-wrap justify-center">
                                    <div class="w-full lg:w-9/12 px-4">
                                        <p class="mb-4 text-lg leading-relaxed text-gray-800">
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis vel
                                            asperiores nisi sed provident ea quaerat possimus eos esse fugit? Molestiae
                                            aliquid dolorem adipisci, nostrum vel sit! Modi, et reprehenderit?
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    </div>

</template>
<script setup>
import Header from "../components/Header.vue"
import { useStore } from "vuex";
import { inject, reactive, onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import ExitAnimationVue from "../components/ExitAnimation.vue";
const router = useRouter()
const store = useStore()
const appAxios = inject("appAxios")
const state = reactive({
    name: null,
    surname: null,
    email: null,
    createDate: null,
    updateDate: null,
    ip: null,
    locationCity: null,
    locationCountry: null

})
const isLoading = ref(false)
console.log(store.getters._getCurrentUser)
console.log(isLoading.value, "dasdasds")
const getProfile = async () => {
    await appAxios.get(`user/profile/${store.getters._getCurrentUser}`).then(res => {
        state.name = res.data.userData._doc.first_name.toUpperCase()
        state.surname = res.data.userData._doc.last_name.toUpperCase()
        state.email = res.data.userData._doc.email
        state.createDate = new Date(Date.parse(res.data.userData._doc.createdAt)).toDateString()
        state.updateDate = new Date(Date.parse(res.data.userData._doc.updatedAt)).toDateString()
        state.locationCity = res.data.userData.city
        state.locationCountry = res.data.userData.country_name
        state.ip = res.data.userData.ip
    }).catch(e => { alert("Bir hata oluştu") })


}

const getIp = async () => {
    await appAxios.get("https://api.ipify.org?format=json").then(response => {
        const ip = response.data.ip
        console.log(ip)
    })
}
const deleteProfile = async () => {
    await appAxios.delete(`user/delete/${store.getters._getCurrentUser}`).then(res => {
        if (res.data.success) {
            isLoading.value = true
        }

    }).catch(e => { alert("Bir hata oluştu") })

}




onMounted(() => {
    getProfile()
    getIp()

})

</script>