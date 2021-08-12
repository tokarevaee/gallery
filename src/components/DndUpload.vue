

<template>
  <div id="file-drag-drop">
    <form ref="fileform" class="dnd-form">
      <div v-if="files.length>0" class="preview__wrapper">
      <div v-for="(file, key) in files" class="file-listing preview__item" :key="key">
        <img class="preview__image" :ref="'preview'+parseInt( key )">
        <!--      {{ file.name }}-->

      </div>
    </div>
      <span v-else class="drop-files">Переместите сюда локальные изображения, для загрузки</span>


<!--      <progress class="progress-files" max="100" :value.prop="uploadPercentage"></progress>-->

      <a class="submit-button" @click="submitFiles()" v-show="files.length > 0">Загрузить</a>
    </form>
<!--{{uploadFilesArray}}-->


<!--    <div v-show="uploadFilesArray">-->
<!--      <div v-for="(item, index) in uploadFilesArray" :key="index" :item="item" :index="index">-->
<!--        <img :src="item.url" alt="">-->
<!--      </div>-->
<!--    </div>-->

  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: "DndUpload",
  data(){
    return {
      dragAndDropCapable: false,
      files: [],
      uploadPercentage: 0,
      uploadFilesArray: [],
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
          // var reader = new FileReader();
          // reader.onload = function () {
          //   var image = new Image();
          //   image.src = reader.e.dataTransfer.files[i];
          //   image.onload = function(){
          //     console.log(this.width, this.height);
          //   }
          // };

          this.files.push( e.dataTransfer.files[i] );
        }
        console.log(this.files)
        this.getImagePreviews();
        // this.submitFiles()
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

    fileToJSON(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = event => resolve(JSON.parse(event.target.result))
        reader.onerror = error => reject(error)
        reader.readAsText(file)
      })
    },

    submitFiles(){
      const fileToImgArr = new Promise((resolve,reject) => {
        console.log(this.files)
        // setTimeout(function(){ alert("Hello");
        let uploadFiles = []
        let fileConstructor = {}

        // for( let i = 0; i < this.files.length; i++ ){
          this.files.forEach(function(file) {
          // let file = this.files[i];
            console.log(file.type)
          if (file.type === "image/png" || file.type === "image/jpeg") {
            let reader = new FileReader();
            // console.log('fsdfsddfsdfsdfsdfsdffsdf')
            reader.onload = () => {
              let image = new Image();
              image.src = reader.result;
              fileConstructor.url = image.src
              image.onload = function () {
                fileConstructor.width = image.width
                fileConstructor.height = image.height
              };
            }
            reader.readAsDataURL(file);
            uploadFiles.push(fileConstructor)

          } else
            if (file.type === "application/json") {
            console.log(this.fileToJSON)
            this.fileToJSON(file).then((response) => {
              console.log(response)
              const { galleryImages } = response;

              const fileJson = galleryImages
              // console.log(fileJson)
              uploadFiles = [...uploadFiles,...fileJson]
              console.log(uploadFiles , 'uploadFiles')
            }).catch((error) => {
              console.log(error)
            })
          }
          resolve(uploadFiles);

          reject(console.log('error'))
        });
        // console.log(uploadFiles, 'uploadFiles')

        // }, 3000);
      });
      console.log(fileToImgArr)
      fileToImgArr
          .then((response) => {
        console.log(response, 'response')
        // this.uploadFilesArray = response
            this.$emit('galleryImages', response);
            this.files = []
            this.uploadFilesArray = []
        // console.log(sendImg, 'RESP');
        //
      }).then(function() {

      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>

<style>
.dnd-form{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
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
  color: #fff;
  font-size: 20px;
}

.progress-files {
  position: absolute;
  bottom: -25px;
}
.preview__item{
  width: 33%;
  box-sizing: border-box;
  /*margin: auto;*/
  padding: 10px;
  /*border-bottom: 1px solid #ddd;*/
}
.preview__image{
  width: 100%;
  /*height: auto;*/
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
  /*margin: auto;*/
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
progress{
  width: 100%;
  height: 25px;
  /*margin: auto;*/
  display: block;
  margin-top: 0px;
  margin-bottom: 0px;
}

.preview__wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  /*height: 100%;*/
}
</style>
