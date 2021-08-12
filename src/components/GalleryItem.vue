<template>
  <div v-lazyload class="gallery__item image__wrapper"  :style="{'width':item.width +'px'}">
    <div @click="deleteImageHandler(index)" class="item__del-btn">
      <img src="@/assets/close.svg" alt="">
    </div>
    <ImageSpinner
        class="image__spinner"
    />
    <img class="image__item" :data-url="item.url" :alt="'picture' + index" :width="item.width" :height="item.height">
  </div>
</template>

<script>

import ImageSpinner from "@/components/ImageSpinner";
export default {
  name: "GalleryItem",
  components: {
    ImageSpinner,
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

  methods: {
    deleteImageHandler(imgIndex) {
      this.$el.remove()
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
  }
}
</style>
