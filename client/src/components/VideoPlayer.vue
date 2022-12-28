<template>
    <vue-plyr>
        <div class="plyr__video-embed">
            <iframe :src=props.videoUrl allowfullscreen allowtransparency></iframe>
        </div>
    </vue-plyr>
</template>
<script setup>
const props = defineProps({ videoUrl: String })




</script>
<style>
.plyr_video-embed {
    --player-color-main: red;
}
</style>
