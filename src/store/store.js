import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    imagesList: [],
    // помещаем сюда переменные и собираем их
  },
  getters : {
    IMAGES : state => {
      return state.imagesList;
    }
  },
  mutations: {
    SET_IMAGES(state, payload) {
      state.imagesList = payload;
    },
    ADD_IMAGE(state, payload) {
      state.imagesList.url = payload.url;
    },
    DEL_IMAGE(state, imgIndex) {
      // state.imagesList.splice(imgIndex, 1);
      if(imgIndex >= 0) {
        state.imagesList.splice(imgIndex,1);
      }
      // console.log(imgIndex)
    },
    // PREPARE_IMAGES(state, payload){
    //
    // }
    // помещаем сюда синхронные функции для изменения состояния: добавления, редактирования, деления
  },
  actions: {
    async fetchImages({ commit }, payload) {
      commit(
          'SET_IMAGES',
          payload
      );
    },
    deleteImage({ commit }, payload){
      commit(
          'DEL_IMAGE',
          payload
      );
    }
    // помещаем сюда асинхронные функции, которые могут вызывать одну или несколько функций мутации
  }
})
