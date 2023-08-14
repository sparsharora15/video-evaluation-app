
<template>
    <div class="flex flex-col justify-center items-center container my-8 mx-auto px-4 md:px-12 relative">
        <Heading title="Video Gallery" v-bind:videos=videos />

        <div v-if="!isLoading" class="flex flex-wrap mx-1  lg:-mx-4">
            <div v-if="videos.length > 0" class="xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid">
                <div v-for="(video, index) in videos" :key="index" @click="handleonclick(video)"
                    class="shadow-4xl my-1 px-1  relative lg:my-4 lg:px-4 ">
                    <i class="fa-solid fa-play absolute top-[50%] right-[50%] fa-2xl "></i>

                    <div class=" overflow-hidden rounded-lg ">

                        <a href="#">
                            <video muted :src="base_url + 'uploads/' + video.video">

                            </video>
                        </a>
                    </div>
                </div>
            </div>
            <div v-else class="container h-[75vh]  mx-auto flex items-center justify-center w-full ">
                <h1 class="text-white font-bold">No videos available....</h1>

            </div>
        </div>
        <div v-else class="container h-[75vh]  mx-auto flex items-center justify-center w-full ">
            <Spinner />
        </div>
        <div v-if="videoName != null"
            class=" justify-center flex items-center lg:w-[70%] w-full p-8  fixed z-[100] bg-[rgb(0,0,0,0.9)] top-[50px]   ">
            <video id="video" v-if="videoName != null" @play="handlePlay" controls @timeupdate="updateCurrentTime"
                ref="videoPlayer" :src="base_url + 'uploads/' + videoName"></video>
            <span v-if="videoName != null" @click="videoName = null" style="user-select: none;cursor: pointer; z-index: 100;"
                class="absolute top-[5px] right-[20px] text-3xl font-bold text-white">&times;</span>
            <p id="subtitle" v-if="currentSubtitle && videoName != null"
                class="absolute bottom-[100px] bg-[black] cursor-pointer text-white p-[8px]">
                {{ currentSubtitle }}
            </p>
            <!-- <i  class="ml-1 fa-solid fa-circle-info"></i> -->
            
        </div>
        <Modal @refresh="getVideos" @loading="updateLoader($event)" />

    </div>
</template>
<script>
import { getVideoData, getVideoWithSubtitle } from '@/Config/API'
import { BASE_URL } from '@/Config/BASE_URL'
import Heading from './Heading.vue'
import moment from "moment";
import Modal from './Modal.vue';
import Spinner from './Spinner.vue';
export default {
    name: 'Video-Cards',
    components: {
        Heading,
        Modal,
        Spinner
    },
    data() {
        return {
            videos: [],
            isPlaying: false,
            base_url: BASE_URL,
            videoName: null,
            subtitles: null,
            currentTime: 0,
            currentSubtitle: null,
            isLoading: false,
            // isLoading: false
        }
    },
    mounted() {
        this.getVideos()
        console.log(this.videos)
    },
    methods: {

        handleonclick(el) {
            // console.log(el._id.$oid)
            getVideoWithSubtitle(el._id.$oid).then((resp) => {
                if (resp.data.statusCode === 200) {
                    // console.log(resp.data.data.subtitles.subtitles.subtitles)
                    this.subtitles =resp.data.data.subtitles.subtitles.subtitles,
                        this.videoName = resp.data.data.video
                }

            })
                .catch((err) => console.log(err))

        },
        updateLoader(Loading) {
            this.isLoading = Loading;
        },
        handlePlay() {
            this.isPlaying = true;
        },
        getVideos() {
            getVideoData()
                .then((resp) => {
                    // console.log(resp.data)
                    this.videos = resp.data
                })
                .catch((err) => console.log(err))
        },
        updateCurrentTime() { 
            var videoElement = document.getElementById('video');
            if (videoElement) {
                const duration = moment.duration(videoElement.currentTime, 'seconds');

                const hours = Math.floor(duration._milliseconds / 3600000);
                duration._milliseconds %= 3600000;

                const minutes = Math.floor(duration._milliseconds / 60000);
                duration._milliseconds %= 60000;

                const seconds = Math.floor(duration._milliseconds / 1000);

                this.currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                const subtitle = this.subtitles.find(sub => this.currentTime >= sub.timeStampFrom && this.currentTime <= sub.timeStampTo);

                if (subtitle) {
                    console.log(subtitle.text)
                    this.currentSubtitle = subtitle.text;
                } else {
                    this.currentSubtitle = '';
                }
            }
        },
    }


}
</script>
