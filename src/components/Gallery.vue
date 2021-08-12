<template>
  <div class="container">
    <h1 class="main__title">Галерея изображений</h1>
    <FormAddImg @galleryImages="galleryImages"></FormAddImg>
    <DndUpload @galleryImages="galleryImagesDnD"></DndUpload>
    <GalleryList :images="imageList" ></GalleryList>
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
      let imageArrayToList = []
      imageArrayToList = [...this.imageList,...images];
      this.imageList = imageArrayToList
    },
    galleryImagesDnD(images){
      let newArrayImages = []
      newArrayImages.push(images)
      const arrayForPush = this.imageList.concat(newArrayImages)
      this.imageList = arrayForPush;
    },
  },
}
</script>

<style scoped>

</style>
