<template>
    <div id="defaultModal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Upload your video with subtitle
                    </h3>
                    <button type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="defaultModal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-6 ">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">
                        Upload video
                    </label>
                    <input ref="video"
                        class="block w-full text-sm mt-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input" type="file" @change="changeVideo" />
                    <p v-if="payload.isVideoFileError" class="text-[red]">
                        Unsuported file type (supported format is video.mp4)
                    </p>
                    <label class="mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">
                        Upload subtitles (in json format)
                        <a :href="`${base_url}uploads/Example.json`">
                            <i data-tooltip-target="tooltip-default" class="ml-1 fa-solid fa-circle-info"></i>
                            <div id="tooltip-default" role="tooltip"
                                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                click to download example Json file
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </a>

                    </label>
                    <input @change="changeSubtitle" ref="subtitle"
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input" type="file" />
                    <p v-if="payload.isSubtitleFileError" class="text-[red]">
                        Unsupported file type (supported format is file.json)
                    </p>

                </div>
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button data-modal-hide="defaultModal" type="button" @click="upload"
                        v-bind:disabled="payload.isSubtitleFileError || payload.isVideoFileError"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Upload
                    </button>
                    <button data-modal-hide="defaultModal" type="button"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { BASE_URL } from '@/Config/BASE_URL'
import { uploadFile } from '@/Config/API'
export default {
    name: "Modal-m",
    props: {
        videos: []
    },
    data() {
        return {
            payload: {
                video: null,
                subtitles: null,
                isSubtitleFileError: false,
                isVideoFileError: false,
            },
            base_url: BASE_URL,
            videosData: this.videos,
        }
    },
    updated() {
        console.log(this.videosData)
    },
    methods: {
        upload() {
            const formData = new FormData()
            formData.append('video', this.payload.video)
            formData.append('subtitles', this.payload.subtitles)
          this.$emit("loading",true)
            uploadFile(formData)

                .then((res) => {
                    console.log(res.data)
                    if (res.data.statusCode === 200) {
                        this.$emit("loading",false)
                        this.$emit("refresh", "")
                        alert(res.data.message)
                        this.payload.video = null,
                        this.payload.subtitles = null
                        this.$refs.subtitle.value = null;
                        this.$refs.video.value = null;

                    }
                })
                .catch((err) => {
                    if (err) {
                        this.$emit("loading",false)
                        alert(err.response.data.message)
                        this.payload.video = null,
                        this.payload.subtitles = null
                        this.$refs.subtitle.value = null;
                        this.$refs.video.value = null;
                    }
                    else {
                        alert('something went wrong')
                    }
                })
        },
        changeVideo(e) {
            this.videoError = []
            if (e.target.files[0]?.type !== "video/mp4") {
                this.payload.isVideoFileError = true
                return
            }
            this.payload.isVideoFileError = false
            this.payload.video = e.target.files[0]
        },
        changeSubtitle(e) {
            this.subtitleError = []
            if (e.target.files[0]?.type !== "application/json") {
                this.subtitleError.push("unsuported file type")
                this.payload.isSubtitleFileError = true
                return
            }
            this.payload.isSubtitleFileError = false
            return this.payload.subtitles = e.target.files[0]
        },
    },
};
</script>