import Vue from 'vue'
import Vuex from 'vuex'
import {
  vuexfireMutations,
  firebaseAction
} from 'vuexfire'
import {
  db
} from '@/store/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    // presentEmoji: '🧑‍💼',
    // notPresentEmoji: '🍺',
    // handRaisedEmoji: '💁🏼',
    // thumbsUpEmoji: '👍',
    // heartSignEmoji: '♥',
    emojiSkinColor: 'skinColorDefault',
    emojiGender: 'female',
    userKey: 'test',
    status: 'present'
  },
  getters: {
    presentEmoji: (state) => {
      return this.getPresentEmoji(state)
    },
    notPresentEmoji: (state) => {
      return this.getPresentEmoji(state)
    },
    handRaisedEmoji: (state) => {
      return this.getPresentEmoji(state)
    },
    thumbsUpEmoji: (state) => {
      return this.getPresentEmoji(state)
    },
    heartSignEmoji: (state) => {
      return this.getPresentEmoji(state)
    },
  },
  methods: {
    getPresentEmoji: (state) => {
      switch (state.emojiSkinColor) {
        case 'skinColorDefault':
          switch (state.emojiGender) {
            case 'male':
              return '👨‍💼'
            case 'female':
              return '👩‍💼'
            case 'genderneutral':
              return '👩‍💼'
          }
          break
        case 'skinColor1':
          switch (state.emojiGender) {
            case 'male':
              return '👨🏻‍💼'
            case 'female':
              return '👩🏻‍💼'
            case 'genderneutral':
              return '👩🏻‍💼'
          }
          break
        case 'skinColor2':
          switch (state.emojiGender) {
            case 'male':
              return '👨🏼‍💼'
            case 'female':
              return '👩🏼‍💼'
            case 'genderneutral':
              return '👩🏼‍💼'
          }
          break
      }
    }
  },
  mutations: {
    ...vuexfireMutations,
    setCurrentState(state, newUserState) {
      state.status = newUserState
    }
  },
  actions: {
    bindUsers: firebaseAction(({ bindFirebaseRef }) => {
      // return the promise returned by `bindFirebaseRef`
      console.log('users')
      bindFirebaseRef('users', db.ref('users'))
      return
    }),
    deleteUser: firebaseAction((context, user) => {
      db.ref('users').child(user.userKey).remove()
    }),
    addNewUser: firebaseAction((context, user) => {
     
      db.ref('users').child(user.userKey).update({
        nickname: user.nickname,
        emojiColor: user.emojiColor,
        emojiGender: user.emojiGender,
      })
    }),
    updateUserSettings: firebaseAction((context, nickname, emojiColor, emojiGender) => {
      db.ref('users/' + nickname).update({
        nickname: nickname,
        emojiColor: emojiColor,
        emojiGender: emojiGender,
      })
    }),

  },
  modules: {}
})