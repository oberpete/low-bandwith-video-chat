import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseAction } from 'vuexfire'
import { db } from '@/store/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
  },
  actions: {
    bindUsers: firebaseAction(({ bindFirebaseRef }) => {
      // return the promise returned by `bindFirebaseRef`
      console.log('users')
      return bindFirebaseRef('users', db.ref('items'))
    }),
    bindItems: firebaseAction(({ bindFirebaseRef }) => {
      // return the promise returned by `bindFirebaseRef`
      console.log('test')
      bindFirebaseRef('users', db.ref('items'))
      console.log(self.users)
      return 
  }),
  },
  modules: {
  }
})
