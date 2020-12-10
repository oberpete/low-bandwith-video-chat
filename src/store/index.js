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
    handRaisedEmoji: '💁🏼'
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
  },

  mutations: {
    ...vuexfireMutations,
    setPresentEmoji (state, newEmoji) {
      state.presentEmoji = newEmoji
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
