<template>
  <div>
    <form  @submit.prevent="submitFileHandler" class="d-flex">
      <div class="input__wrapper">
        <input  id="input__file" type="file" ref="fileImage" class="input input__file" v-on:change="handleFileUpload()" placeholder="Вставьте ссылку на изображение или на список изображений">
        <label for="input__file" class="input__file-button">
          <span class="input__file-icon-wrapper"><img class="input__file-icon" src="@/assets/add.svg" alt="Выбрать файл" width="25"></span>
          <span class="input__file-button-text">Выберите файл .json</span>
        </label>
      </div>
      <button type="submit" class="btn">
        Загрузить
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormAddImg",
  data() {
    return {
      form: {
        file: '',
      },
      file: null,
      images: [],
      isLoading: false,
    };
  },
  methods: {
    handleFileUpload() {
        this.file = this.$refs.fileImage.files[0];
    },

    async fileToJSON(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = event => resolve(JSON.parse(event.target.result))
        fileReader.onerror = error => reject(error)
        fileReader.readAsText(file)
      })
    },
    async submitFileHandler() {
      if(this.file) {
        if(this.file.type === "application/json") {
          this.fileToJSON(this.file).then((response) =>{
            const { galleryImages } = response;
            const fileJson = galleryImages
            this.form.file = fileJson
            this.$emit('galleryImages', this.form.file);
            this.form.file = ''
          }).catch((error) => {
            console.log(error)
          })
        } else if (this.file.type === "image/png" || this.file.type === "image/jpeg"){
          console.log('error')
        }
      }
    },
  },

}
</script>

<style scoped>
.input__wrapper {
  width: 100%;
  position: relative;
  text-align: center;
}

.input__file {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}

.input__file-icon-wrapper {
  height: 50px;
  width: 60px;
  margin-right: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-right: 1px solid #fff;
}

.input__file-button-text {
  line-height: 1;
  margin-top: 1px;
}

.input__file-button {
  width: 100%;
  height: 50px;
  background: #030c7b;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 700;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  border-radius: 3px;
  cursor: pointer;
}
</style>
