<template>
  <div class="gallery__list"  ref="galleryList">
<!--    <div v-if="images">-->
      <GalleryItem v-for="(item, index) in imageArr" :key="index" :item="item" :index="index" @delImg="delImgHandler"/>
<!--    </div>-->
<!--    {{images}}-->
<!--    {{imageArr}}-->

  </div>
</template>

<script>
import GalleryItem from "@/components/GalleryItem";


export default {
  name: "GalleryList",
  components: {
    GalleryItem,
  },
  props: {
    images: {
      type: Array,
    },
  },
  data() {
    return{
      imageArr: [],
      imagesWrapperWidth: 0,
    }
  },
  watch: {
    images: {
      handler(){
        // this.getImagesWrapperWidth()
        this.getResizedImages()
      },
      deep: true
    },
    // images: function () {
    //   this.getImagesWrapperWidth()
    //   this.getResizedImages()
    //
    // },
    imagesWrapperWidth: function () {
      this.getResizedImages()
    }
  },
  mounted () {
    window.addEventListener('resize', this.getImagesWrapperWidth);
    this.getImagesWrapperWidth()
    // this.getResizedImages()

  },
  created() {
    // this.getResizedImages()
    // this.getImagesWrapperWidth()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getImagesWrapperWidth);

  },
  computed: {
    // arr() {
    //   return this.imageArr
    // }
  },

  methods: {
    delImgHandler(imgIndex){
      // console.log(imgIndex)
      // const imageArrWithDel =
      if (imgIndex >= 0) {
        this.imageArr.splice(imgIndex, 1);
        this.getResizedImages()
      }

      // this.getResizedImages()
      // console.log(this.images)
    },

    getImagesWrapperWidth(){
        this.imagesWrapperWidth = this.$refs.galleryList.clientWidth
    },
    getResizedImages(){
      // this.getImagesWrapperWidth()
      this.imageArr = [];
      let lines = [];
      let imgRatioSum = 0;
      const galleryListWidth = this.imagesWrapperWidth
      const linesRatio = galleryListWidth / 200;

      this.images.forEach((image, index) => {
        imgRatioSum += image.width / image.height;
        lines[index] = {
          ratio: image.width / image.height,
          url: image.url
        }

        if (imgRatioSum > linesRatio) {
          lines.forEach(({ratio, url}) => {
            this.imageArr.push({
              width: galleryListWidth * ratio / imgRatioSum,
              url: url
            })
          })

          lines = [];
          imgRatioSum = 0;
        }

        if (index + 1 === this.images.length) {
          lines.forEach(({ratio, url}) => {
            this.imageArr.push({
              width: galleryListWidth * ratio / linesRatio,
              url: url
            })
          })
        }
      });

    },

  },

}
</script>

<style scoped>

</style>
