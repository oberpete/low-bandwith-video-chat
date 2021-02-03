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
    userKey: '',
    predictions: [],
    currentPrediction: 'present',
    emojiIdentity: {
      skinTone: 'light',
      gender: 'male',
    }
  },
  getters: {
    /* presentEmoji: (state) => {
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
    }, */
    getEmojiByCurrentPrediction: (state) => {
      switch (state.currentPrediction) {
        case 'present':
          return state.emojiIdentity.present
        case 'not present':
          return state.emojiIdentity.notPresent
        case 'hand raised':
          return state.emojiIdentity.handRaised
        default: 
          return state.emojiIdentity.present
      }
    }
  },
  methods: {
   
  },
  mutations: {
    ...vuexfireMutations,
    setPredictions(state, predictions) {
      state.predictions = predictions
    },
    setCurrentPrediction(state, currentPrediction) {
      state.currentPrediction = currentPrediction
    },
    setUserKey(state, userKey) {
      state.userKey = userKey
    },
    setEmojiIdentity(state, {emojiGender, emojiColor}) {
      console.log(emojiGender, emojiColor)
      state.emojiIdentity.gender = emojiGender
      state.emojiIdentity.skinTone = emojiColor
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
        status: 'present'
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