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
    userKey: '',
    // current prediction (className, probability, noOfConsecutiveLoops)
    prediction: {},
    openDialog: 'true',
    emojiIdentity: {
      skinTone: 'light',
      gender: 'male',
    }
  },
  getters: {

  },
  mutations: {
    ...vuexfireMutations,
    setPrediction(state, predictions) {
      let previousPrediction = state.prediction

      // get class w highest probability
      let iMax = 0
      for(let i = 0; i < predictions.length; i++){
        if (predictions[i].probability > predictions[iMax].probability) {
          iMax = i
        }
      }
      var prediction = {}
      prediction.className = predictions[iMax].className
      prediction.probability = predictions[iMax].probability
      console.log('objkect.keys', Object.keys(previousPrediction), 
        Object.keys(previousPrediction).length && previousPrediction.className === prediction.className, 
        previousPrediction.className, prediction.className)

      // check if previous state equals current state and save number of consecutive loops
      if (Object.keys(previousPrediction).length && previousPrediction.className === prediction.className) {
        prediction.noOfConsecutiveLoops = previousPrediction.noOfConsecutiveLoops + 1
      } else {
        prediction.noOfConsecutiveLoops = 1
      }

      state.prediction = prediction
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