import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
import { db } from '@/store/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    presentEmoji: '😊',
    notPresentEmoji: '🍺',
    handRaisedEmoji: '💁🏼',
    thumbsUpEmoji: '👍',
    heartSignEmoji: '♥',
  },
  getters: {
    presentEmoji: (state) => {
      return state.presentEmoji
    },
    notPresentEmoji: (state) => {
      return state.notPresentEmoji
    },
    handRaisedEmoji: (state) => {
      return state.handRaisedEmoji
    },
    thumbsUpEmoji: (state) => {
      return state.thumbsUpEmoji
    },
    heartSignEmoji: (state) => {
      return state.heartSignEmoji
    },
  },

  mutations: {
    ...vuexfireMutations,
    setPresentEmoji (state, newEmoji) {
      state.presentEmoji = newEmoji
    },
    setNotPresentEmoji (state, notPresentEmoji) {
      state.notPresentEmoji = notPresentEmoji
    },
    setHandsRaisedEmoji (state, handRaisedEmoji) {
      state.handRaisedEmoji = handRaisedEmoji
    },
    setThumbsUpEmoji (state, thumbsUpEmoji) {
      state.thumbsUpEmoji = thumbsUpEmoji
    },
    setHeartSignEmoji (state, heartSignEmoji) {
      state.heartSignEmoji = heartSignEmoji
    }
  },
  actions: {
    bindUsers: firebaseAction(({ bindFirebaseRef }) => {
      // return the promise returned by `bindFirebaseRef`
      console.log('users')
      bindFirebaseRef('users', db.ref('users'))
      return 
    }),
  },
  modules: {
  }
})
