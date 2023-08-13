<template>
    <div class="containerer mx-auto justify-between items-center flex w-full">
        <h1 class="font-bold mb-5 flex justify-end text-2xl text-white">{{ title }}</h1>
        <div class=" flex justify-end">
        <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" type="button" class="text-white bg-gradient-to-br
             from-purple-600 to-blue-500
              hover:bg-gradient-to-bl
                 dark:focus:ring-blue-800 font-medium
                  rounded-lg text-sm px-5 py-2.5 text-center  mb-2">
                  Upload file
            <i class="fa-solid fa-cloud-arrow-up ml-2"></i>
        </button>
    </div>
    </div>
</template>
<script>
export default {
    name: 'Heading-h',
    components: {
    },
    data() { return {
        videoData:this.videos
    } },
    props: {
        title: String,
        videos: []

    },

}
</script>