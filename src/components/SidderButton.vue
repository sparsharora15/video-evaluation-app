<template>
    <div class=" flex justify-end">
        <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" type="button" class="text-white bg-gradient-to-br
             from-purple-600 to-blue-500
              hover:bg-gradient-to-bl
                 dark:focus:ring-blue-800 font-medium
                  rounded-lg text-sm px-5 py-2.5 text-center  mb-2">
            {{ buttonTitle }}
            <i class="fa-solid fa-cloud-arrow-up ml-2"></i>
        </button>
        <Modal />
    </div>
</template>
<script>
import Modal from './Modal.vue';
export default {
    name: "Sidder-Button",
    props: {
        buttonTitle: String
    },
    components: {
        Modal
    },
}
</script>