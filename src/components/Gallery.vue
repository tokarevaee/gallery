<template>
  <div class="container">
    <h1 class="main__title">Галерея изображений</h1>
    <FormAddImg @galleryImages="galleryImages"></FormAddImg>
    <DndUpload @galleryImages="galleryImages"></DndUpload>
    <GalleryList :images="imageList" @delImg="delImgHandler"></GalleryList>
  </div>
</template>

<script>

import FormAddImg from '@/components/FormAddImg.vue'
import DndUpload from '@/components/DndUpload.vue'
import GalleryList from '@/components/GalleryList.vue'
export default {
name: "Gallery",
  components: {
    FormAddImg,
    DndUpload,
    GalleryList,
  },
  data() {
    return{
      imageList: [],
      addImage: [],
    }
  },

  methods: {
    galleryImages(images){
      this.imageList = [...this.imageList,...images];
    },
    delImgHandler(imgIndex) {
        this.imageList.splice(imgIndex, 1);
    }
  },
}
</script>
