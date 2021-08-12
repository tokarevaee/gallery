<template>
  <div class="loader-container is-in-button">
    <span class="spinner-grow"> </span>
  </div>
</template>

<script>
export default {
  name: 'Loader',
};
</script>

<style scoped>
.loader-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader-container.is-in-button .spinner-border {
  width: 18px;
  height: 18px;
}

@keyframes spinner-grow {
  0% {
    transform: scale(0);
  }
  50% {
    opacity: 1;
  }
}

.spinner-grow {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: text-bottom;
  background-color: currentColor;
  border-radius: 50%;
  opacity: 0;
  -webkit-animation: spinner-grow .75s linear infinite;
  animation: spinner-grow .75s linear infinite;
}


</style>
