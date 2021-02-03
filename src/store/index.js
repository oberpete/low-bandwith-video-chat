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
    openDialog: 'true',
    currentPrediction: 'present',
    emojiIdentity: {
      skinTone: 'light',
      gender: 'male',
    }
  },
  getters: {

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
    },
    setOpenDialog(state, openDialog) {
      state.openDialog = openDialog
    },
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
    updateUserSettings: firebaseAction((context, user) => {
      db.ref('users').child(user.userKey).update({
        nickname: user.nickname,
        emojiColor: user.emojiColor,
        emojiGender: user.emojiGender,
      })
    }),

  },
  modules: {}
})