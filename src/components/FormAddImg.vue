<template>
  <div>
    <form  @submit.prevent="submitFileHandler" class="d-flex">
      <div class="input__wrapper">
        <input  id="input__file" type="file" multiple ref="fileImage" class="input input__file" v-on:change="handleFileUpload()" placeholder="Вставьте ссылку на изображение или на список изображений">
        <label for="input__file" class="input__file-button">
          <span class="input__file-icon-wrapper"><img class="input__file-icon" src="@/assets/add.svg" alt="Выбрать файл" width="25"></span>
          <span class="input__file-button-text"> {{ inputTextButton }} </span>
        </label>
      </div>
      <button type="submit" class="btn">
        Загрузить
      </button>
    </form>
  </div>
</template>

<script>
function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    const fileConstructor = {};
    reader.onload = () => {
      let image = new Image();
      image.src = reader.result;
      fileConstructor.url = image.src;
      image.onload = function () {
        fileConstructor.width = image.width;
        fileConstructor.height = image.height;

        resolve(fileConstructor);
      };
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function readFileJsonAsync(file) {
  return new Promise((resolve) => {
    let fileToJSON = function (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          try {
            resolve(JSON.parse(reader.result));
          } catch (err) {
            reject();
          }
        }
        reader.readAsText(file);
      })
    };
    fileToJSON(file).then((response) => {
      const { galleryImages } = response;
      resolve(galleryImages);
    }).catch((error) => {
      console.log(error)
    })
  });
}

export default {
  name: "FormAddImg",
  data() {
    return {
      form: {
        file: '',
      },
      files: [],
      isLoading: false,
    };
  },
  computed: {
    inputTextButton() {
      return this.file ? 'Файл выбран, нажмите "Загрузить"' : 'Выберите изображения или файлы .json'
    }
  },
  methods: {
    handleFileUpload() {
        this.files = this.$refs.fileImage.files;
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
      const fileToImgArr = async () => {
        let uploadFiles = [];
        for await (let file of this.files) {
          if (file.type === "image/png" || file.type === "image/jpeg") {
            const f = await readFileAsync(file);
            uploadFiles.push(f);
          } else if (file.type === "application/json") {
            const f = await readFileJsonAsync(file);
            uploadFiles= [...uploadFiles, ...f];
          }
        }
        return uploadFiles;
      };
      fileToImgArr()
          .then((response) => {
            this.$emit("galleryImages", response);
            this.files = [];
            this.uploadFilesArray = [];
          }).catch((error) => {
        console.log(error);
      });
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
