<template>
<!--  <div>-->

  <div v-lazyload class="gallery__item image__wrapper"  :style="{'width':item.width +'px'}">
    <div @click="deleteImageHandler(index)" class="item__del-btn">
      <img src="@/assets/close.svg" alt="">
    </div>
    <ImageSpinner
        class="image__spinner"
    />
    <img class="image__item" :data-url="item.url" :alt="'picture' + index" :width="item.width" :height="item.height">
  </div>

<!--  <div class="gallery__item image__wrapper"  :style="{'width':item.width +'px'}">-->
<!--&lt;!&ndash;    <ImageSpinner&ndash;&gt;-->
<!--&lt;!&ndash;        class="image__spinner"&ndash;&gt;-->
<!--&lt;!&ndash;    />&ndash;&gt;-->
<!--    <div @click="deleteImageHandler(index)" class="item__del-btn">-->
<!--      <img src="@/assets/close.svg" alt="">-->
<!--    </div>-->
<!--    <img class="image__item" :src="item.url" :alt="'picture' + index" :width="item.width" :height="item.height">-->
<!--  </div>-->
<!--  </div>-->
</template>

<script>

import ImageSpinner from "@/components/ImageSpinner";
// import Loader from "@/components/ImageSpinner";
export default {
  name: "GalleryItem",
  components: {
    ImageSpinner,
    // Loader
  },
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number,
      required: true
    },

  },
  data() {
    return {
      // flagSpiner: true,
    }
  },
  computed: {
    // flagTrue() {
    //   return this.false
    // }
  },
  methods: {
    deleteImageHandler(imgIndex) {
        this.$el.remove()
      // this.$el.removeAttribute('v-lazyload')
        // this.flagSpiner = false
      this.$emit('delImg', imgIndex);
    },
  },
}
</script>

<style scoped lang="scss">
.image {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    &.loaded {
      .image {
        &__item {
          visibility: visible;
          opacity: 1;
          border: 0;
        }

        &__spinner {
          text-align: center;
          display: none;
          width: 100%;
        }
      }
    }
  }

  &__item {
    transition: all 0.4s ease-in-out;
    //opacity: 0;
    //visibility: hidden;
  }
}
</style>
