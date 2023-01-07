<template>
  <Header />

  <div v-if="isLoadingv">
    <vue-plyr>
      <div>
        <div class="plyr__video-embed">
          <iframe :src="videoUrl" allowfullscreen allowtransparency></iframe>
        </div>

      </div>

    </vue-plyr>
  </div>
  <div v-else>

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

      videoUrl.value = `https://www.youtube.com/embed/${response.videos.results[0].key}?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`;
      isLoading.value = true

    });



}
const isLoadingv = computed(() => isLoading.value)

console.log(isLoadingv, "2")
onMounted(() => {

  fetchVideoInfo();



});


</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  margin-left: 100px;

  &::before {
    content: "";
    position: relative;
    top: 0;
    left: 0px;
    width: 100%;
    height: 8%;
    background: $color-background;
    margin-top: 100px;
  }

  &__video {
    margin-top: 10px;
    width: 100%;
    height: 75vh;
    margin-left: 50px;

  }
}

@media (max-width: 768px) {
  .container {
    width: calc(100% - 100px);

  }

}

@media (min-width: 769px) and (max-width: 1200px) {
  .container {
    width: calc(100% - 100px);
  }
}
</style>
