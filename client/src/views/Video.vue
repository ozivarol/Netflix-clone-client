<template>
  <div class="header">
    <Header />

  </div>


  <div v-if="isLoadingv">
    <div class="video-wrapper">
      <vue-plyr>
        <div data-plyr-provider="youtube" :data-plyr-embed-id="videoUrl">


        </div>

      </vue-plyr>

    </div>

  </div>


</template>

<script setup>
import { reactive, onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import Header from "../components/Header.vue"
import VideoPlayerVue from "../components/VideoPlayer.vue";


const apikey = "a374ac826efdfc13e836a30f9f223b41";
const route = useRoute();
let videoInfo = reactive({
  type: "",
  id: "",
});
const isLoading = ref(false)
const videoUrl = ref("");

console.log(isLoading.value, "1")
async function fetchVideoInfo() {
  await fetch(`https://api.themoviedb.org/3/find/${route.params.id}?api_key=${apikey}&language=en-US&external_source=imdb_id`)
    .then((response) => response.json())
    .then((response) => {

      if (response.movie_results.length > 0) {
        videoInfo.type = "movie";
        videoInfo.id = response.movie_results[0].id;
      }
      else {
        videoInfo.type = "tv";
        videoInfo.id = response.tv_results[0].id;
      }
      fetchVideoUrl();
    });
}
async function fetchVideoUrl() {
  await fetch(`https://api.themoviedb.org/3/${videoInfo.type}/${videoInfo.id}?api_key=${apikey}&append_to_response=videos`)
    .then((response) => response.json())
    .then((response) => {


      videoUrl.value = response.videos.results[0].key;
      isLoading.value = true

    });



}
const isLoadingv = computed(() => isLoading.value)

console.log(isLoadingv, "2")
onMounted(() => {

  fetchVideoInfo();



});


</script>

<style>
.video-wrapper {
  width: 1950px;
  height: 800px;
  margin-top: 50px;
  position: absolute;

}



@media only screen and (max-width: 820px) {
  .error-message {
    font-size: 14px;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);

  }
}



@media only screen and (max-width: 400px) {
  .header {
    position: fixed;
    padding: auto;
    margin-left: 10px;
  }

  .video-wrapper {
    width: 390px;
    height: 500px;
    margin-top: 50px;
    position: absolute;

  }
}
</style>
