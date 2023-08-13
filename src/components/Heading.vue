<template>
    <div class="containerer mx-auto justify-between items-center flex w-full">
        <h1 class="font-bold mb-5 flex justify-end text-2xl text-white">{{ title }}</h1>
        <SidderButton buttonTitle="Upload file"/>
    </div>
</template>
<script>
import SidderButton from './SidderButton.vue';
export default {
    name: 'Heading-h',
    components:{
        SidderButton
    },
    props: {
        title: String,

    },
    mounted(){
        console.log(this.heading)
    }

}
</script>