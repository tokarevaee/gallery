<template>
  <div class="gallery__list"  ref="galleryList">
<!--    <div>-->
      <GalleryItem v-for="(item, index) in imageArr" :key="index" :item="item" :index="index"/>
<!--    </div>-->
  </div>
</template>

<script>
import GalleryItem from "@/components/GalleryItem";

export default {
  name: "GalleryList",
  components: {
    GalleryItem,
  },
  data() {
    return{
      imageArr: [],
      items: [
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550746.jpg",
          "width": 640,
          "height": 426
        },
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964007.jpg",
          "width": 1920,
          "height": 1200
        },
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550739.jpg",
          "width": 640,
          "height": 426
        },
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964009.jpg",
          "width": 436,
          "height": 650
        },
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550740.jpg",
          "width": 600,
          "height": 400
        },
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964008.jpg",
          "width": 509,
          "height": 339
        },
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964011.jpg",
          "width": 900,
          "height": 450
        },
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550755.jpg",
          "width": 480,
          "height": 640
        },
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964013.jpg",
          "width": 472,
          "height": 640
        },
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550745.jpg",
          "width": 640,
          "height": 425
        },
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964014.jpg",
          "width": 240,
          "height": 320
        },
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964016.jpg",
          "width": 540,
          "height": 337
        },
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964020.jpg",
          "width": 1600,
          "height": 1000
        },
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964010.jpg",
          "width": 1506,
          "height": 575
        },
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550754.jpg",
          "width": 1280,
          "height": 1276
        },
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964021.jpg",
          "width": 1280,
          "height": 800
        },
        {
          "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964012.jpg",
          "width": 787,
          "height": 787
        }
      ]
    }
  },
  mounted () {
    window.addEventListener('resize', this.getResizedImages);
    this.getResizedImages()
  },

  methods: {
     getResizedImages(){
      this.imageArr = [];
      let lines = [];
      let imgRatioSum = 0;
      const galleryListWidth = this.$refs.galleryList.clientWidth
      const linesRatio = galleryListWidth / 200;
      console.log(linesRatio)
       console.log(galleryListWidth)
      this.items.forEach((image, index) => {
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

        if (index + 1 === this.items.length) {
          lines.forEach(({ratio, url}) => {
            this.imageArr.push({
              width: galleryListWidth * ratio / linesRatio,
              url: url
            })
          })
        }

      });
    }
  },

}
</script>

<style scoped>

</style>
