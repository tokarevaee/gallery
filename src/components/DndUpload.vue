<template>
  <div id="file-drag-drop">
    <form ref="fileform" class="dnd-form">
      <div v-if="files.length>0" class="preview__wrapper">
      <div v-for="(file, key) in files" class="file-listing preview__item" :key="key">
        <img class="preview__image" :ref="'preview'+parseInt( key )">
      </div>
    </div>
      <div v-else class="drop-files"><span>Переместите в эту область локальные изображения или .json, для загрузки</span></div>
      <a class="submit-button" @click="submitFiles()" v-show="files.length > 0">Загрузить</a>
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
  name: "DndUpload",
  data(){
    return {
      dragAndDropCapable: false,
      files: [],
      uploadPercentage: 0,
      uploadFilesArray: [],
      uploadFilesJson: [],
    }
  },

  mounted(){
    this.dragAndDropCapable = this.determineDragAndDropCapable();
    if( this.dragAndDropCapable ){
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
        this.$refs.fileform.addEventListener(evt, function(e){
          e.preventDefault();
          e.stopPropagation();
        }.bind(this), false);
      }.bind(this));

      this.$refs.fileform.addEventListener('drop', function(e){
        for( let i = 0; i < e.dataTransfer.files.length; i++ ){
          this.files.push( e.dataTransfer.files[i] );
        }
        this.getImagePreviews();
      }.bind(this));
    }
  },

  methods: {

    getImagePreviews(){
      for( let i = 0; i < this.files.length; i++ ){
        if ( /\.(jpe?g|png|gif)$/i.test( this.files[i].name ) ) {
          let reader = new FileReader();
          reader.addEventListener("load", function(){
            this.$refs['preview'+parseInt( i )][0].src = reader.result;
          }.bind(this), false);
          reader.readAsDataURL( this.files[i] );
        } else {
          this.$nextTick(function(){
            this.$refs['preview' + parseInt( i )][0].src = require(`@/assets/json.png`);
          });
        }
      }
    },
    determineDragAndDropCapable(){
      var div = document.createElement('div');
      return ( ( 'draggable' in div )
          || ( 'ondragstart' in div && 'ondrop' in div ) )
          && 'FormData' in window
          && 'FileReader' in window;
    },


    async submitFiles(){
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
  }
}
</script>

<style lang="scss" scoped>
.dnd-form{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
  background: transparent;
  margin: auto;
  margin-top: 40px;
  text-align: center;
  border: 1px dotted #fff;
  border-radius: 4px;
  position: relative;
}


.drop-files {
  font-size: 20px;
  padding: 10px;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
}

.drop-files span {
  color: #fff;
  font-size: 14px;
  margin: auto;
  @media (min-width: 768px) {
    font-size: 20px;
  }
}

.progress-files {
  position: absolute;
  bottom: -25px;
}
.preview__item{
  width: 33%;
  box-sizing: border-box;
  padding: 10px;
}
.preview__image{
  width: 100%;
}
div.remove-container{
  text-align: center;
}
div.remove-container a{
  color: red;
  cursor: pointer;
}
a.submit-button{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  text-align: center;
  height: 40px;
  padding: 10px;
  text-transform: uppercase;
  background-color: #fff;
  color: #030c7b;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
}

.preview__wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
}
</style>
