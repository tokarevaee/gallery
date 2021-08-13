<template>
  <div class="gallery__list"  ref="galleryList">
      <GalleryItem v-for="(item, index) in imageArr" :key="item.width && item.url" :item="item" :index="index" @delImg="delImgHandler"/>
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
        if(this.images.length) {
          this.getResizedImages(this.images)
        }
      },
      deep: true
    },

    imagesWrapperWidth: function () {
      this.getResizedImages(this.images)
    }
  },
  mounted () {
    window.addEventListener('resize', this.getImagesWrapperWidth);
    this.getImagesWrapperWidth()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getImagesWrapperWidth);
  },

  methods: {
    delImgHandler(imgIndex){
      this.$emit('delImg', imgIndex);
    },

    getImagesWrapperWidth(){
        this.imagesWrapperWidth = this.$refs.galleryList.clientWidth
    },
    async getResizedImages(images){
      const fileToImgArr = async () => {
        let imageArr = [];
        let lines = [];
        let imgRatioSum = 0;
        const galleryListWidth = this.imagesWrapperWidth
        const linesRatio = galleryListWidth / 200;
        for await (let [index, image] of images.entries()) {
          imgRatioSum += image.width / image.height;
          lines[index] = {
            ratio: image.width / image.height,
            url: image.url
          }
          if (imgRatioSum > linesRatio) {
            lines.forEach(({ratio, url}) => {
              imageArr.push({
                width: galleryListWidth * ratio / imgRatioSum,
                url: url
              })
            })
            lines = [];
            imgRatioSum = 0;
          } else if (index + 1 === images.length) {
            lines.forEach(({ratio, url}) => {
              imageArr.push({
                width: galleryListWidth * ratio / imgRatioSum,
                url: url
              })
            })
            lines = [];
            imgRatioSum = 0;
          }
        }
        return await imageArr;
      };
      fileToImgArr().then((response)=> {
        this.imageArr = response
      }).catch((error) => {
      console.log(error);
    });
    },
  },
}
</script>

