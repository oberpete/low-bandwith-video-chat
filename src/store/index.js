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
    // TM response with all classes and corresponding probabilities
    predictions: [],
    // current prediction (className, probability, noOfConsecutiveLoops)
    currentPrediction: {},
    // state that will be shared with others
    currentState: 'no-webcam',
    openDialog: 'true',
    emojiIdentity: {
      skinTone: 'light',
      gender: 'male',
    },
    heartEmojiColor: 'red', 
    notPresentEmojiType: 'coffee'
  },
  getters: {

  },
  mutations: {
    ...vuexfireMutations,
    setPrediction(state, predictions) {
      // save TM response with all classes
      state.predictions = predictions

      // extract and save current prediction
      let previousPrediction = state.currentPrediction

      // get class w highest probability
      let iMax = 0
      for(let i = 0; i < predictions.length; i++){
        if (predictions[i].probability > predictions[iMax].probability) {
          iMax = i
        }
      }
      // construct predictionObject
      var currentPrediction = {}
      currentPrediction.className = predictions[iMax].className
      currentPrediction.probability = predictions[iMax].probability
      console.log('objkect.keys', Object.keys(previousPrediction), 
        Object.keys(previousPrediction).length && previousPrediction.className === currentPrediction.className, 
        previousPrediction.className, currentPrediction.className)

      // check if previous state equals current state and save number of consecutive loops
      if (Object.keys(previousPrediction).length && previousPrediction.className === currentPrediction.className) {
        currentPrediction.noOfConsecutiveLoops = previousPrediction.noOfConsecutiveLoops + 1
      } else {
        currentPrediction.noOfConsecutiveLoops = 1
      }

      state.currentPrediction = currentPrediction
    },
    setUserKey(state, userKey) {
      state.userKey = userKey
    },
    setEmojiSettings(state, {emojiGender, emojiColor, heartEmojiColor, notPresentEmojiType}) {
      console.log(emojiGender, emojiColor)
      state.emojiIdentity.gender = emojiGender
      state.emojiIdentity.skinTone = emojiColor
      state.heartEmojiColor = heartEmojiColor
      state.notPresentEmojiType = notPresentEmojiType
    },
    setOpenDialog(state, openDialog) {
      state.openDialog = openDialog
    },
    setCurrentState(state, currrentState) {
      state.currentState = currrentState
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
        heartEmojiColor: user.heartEmojiColor,
        notPresentEmojiType: user.notPresentEmojiType,
        status: 'no-webcam'
      })

    }),
    updateUserSettings: firebaseAction((context, user) => {
      db.ref('users').child(user.userKey).update({
        nickname: user.nickname,
        emojiColor: user.emojiColor,
        emojiGender: user.emojiGender,
        heartEmojiColor: user.heartEmojiColor,
        notPresentEmojiType: user.notPresentEmojiType,
      })
    }),

  },
  modules: {}
})