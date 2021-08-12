<template>
  <div class="gallery__list"  ref="galleryList">
      <GalleryItem v-for="(item, index) in imageArr" :key="index" :item="item" :index="index" @delImg="delImgHandler"/>
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
        this.getResizedImages()
      },
      deep: true
    },
    imagesWrapperWidth: function () {
      this.getResizedImages()
    }
  },
  mounted () {
    window.addEventListener('resize', this.getImagesWrapperWidth);
    this.getImagesWrapperWidth()

  },
  created() {
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getImagesWrapperWidth);

  },

  methods: {
    delImgHandler(imgIndex){
      if (imgIndex >= 0) {
        this.imageArr.splice(imgIndex, 1);
        this.getResizedImages()
      }
    },

    getImagesWrapperWidth(){
        this.imagesWrapperWidth = this.$refs.galleryList.clientWidth
    },
    getResizedImages(){
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

