


<template>
    <div>
        <div v-if="errorMessage"
            class="error-message absolute top-0 right-0 p-4  bg-red-500 text-white rounded-md opacity-70">
            <i class="fas fa-exclamation-circle fa-fw h-6 w-6"></i> {{ props.errorMessage }}
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({ errorMessage: String })

</script>

<style>
.error-message {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
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

@media only screen and (max-width: 540px) {
    .error-message {
        font-size: 14px;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 9px;
    }
}

@media only screen and (max-width: 400px) {
    .error-message {
        font-size: 8px;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 9px;
    }
}
</style>