<template>
  <v-container>
    <v-dialog
      v-model="dialog"
      width="800"
      persistent
    >
      <TutorialStepper @close-dialogue="handleCloseDialogue"></TutorialStepper>

    </v-dialog>
    <v-row>
      <span class="text-h4 font-weight-bold primary--text">
        Very Important Meeting
      </span>
    </v-row>
    <v-row>
      <v-col>
        <WebcamAndPrediction />
        <Chat />
      </v-col>
      <v-col>
        <Peers />
      </v-col>
    </v-row>
    <v-row v-if="predictions" class="opacity">
      <v-col v-for="(prediction, i) in predictions" v-bind:key="prediction.className">
        <v-card :color="classWithHighestProbability === i ? 'orange lighten-3' : ''">
          <v-card-title>
            {{ prediction.className }}
          </v-card-title>
          <v-card-text>
            <v-icon large>
              {{getIcon(prediction.className)}}
            </v-icon>
            <span class="overline">
              {{ prediction.probability }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- 
     <v-row class="mx-6 my-2" v-for="(feedItem, index) in users" v-bind:key="index">
      <v-col cols="12" class="mt-8">
        <v-card class="mx-auto" max-width="344">
            <div>Key: {{ feedItem['.key'] }}</div>
            <p class="display-1 text--primary">
              {{ feedItem.presentEmoji }}
            </p>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="344">
            <div>User Emojis</div>
            <p class="display-1 text--primary">
              PresentEmoji: {{ this.presentEmoji }}
            </p>
            <p class="display-1 text--primary">
              NotPresentEmoji: {{ this.notPresentEmoji }}
            </p>
            <p class="display-1 text--primary">
              handRaisedEmoji: {{ this.handRaisedEmoji }}
            </p>
        </v-card>
      </v-col> 
    </v-row> -->
  </v-container>
</template>

<script>
import '@tensorflow/tfjs'

import Peers from '../components/Peers.vue'
import Chat from '../components/Chat.vue'
import TutorialStepper from '../components/TutorialStepper.vue'
import WebcamAndPrediction from '../components/WebcamAndPrediction.vue'
import Emoji from '../components/Emoji.vue'

import {
    mapState, mapMutations
  } from 'vuex'
import {
  db
} from '@/store/db'


export default {
  components: {
     Peers, Chat, TutorialStepper, WebcamAndPrediction, Emoji
  },
  data() {
    return {
      dialog: true,
      model: null,
      url: 'https://teachablemachine.withgoogle.com/models/erVKbrLsV/',
      nickname: "",
      emojiColor: "",
      emojiGender: "",
      userKey: "",
    }
  },

  created() {
    document.addEventListener('beforeunload', this.leaving);
    window.addEventListener('beforeunload', this.leaving)
  },

  methods: {
    ...mapMutations(['setUserKey', 'setEmojiIdentity']),
      
    getIcon: function(className) {
      switch (className) {
        case 'present':
          return 'mdi-check-bold'
        case 'not present':
          return 'mdi-close-thick'
        case 'hand raised':
          return 'mdi-hand'
        default:
          return 'mdi-exclamation-thick'
      }
    },
    setNewEmoji: function() {
      this.$store.commit('setPresentEmoji', '🥐')
    },
    handleCloseDialogue: function({nickname, emojiColor, emojiGender}) {
      this.nickname = nickname
      this.emojiColor = emojiColor
      this.emojiGender = emojiGender
      this.dialog = false
      let userKey = db.ref('users').push().getKey()
      this.userKey = userKey
      this.$store.dispatch('addNewUser', {nickname, emojiColor, emojiGender, userKey})
      console.log(emojiColor, emojiGender)
      this.setEmojiIdentity({emojiGender, emojiColor})
      this.setUserKey(userKey)
    },
    leaving: function() {
      let userKey = this.userKey
      this.$store.dispatch('deleteUser', {userKey})
    },
  },
  computed: {
    /*...mapState(['users', 'notPresentEmoji', 'handRaisedEmoji', 'presentEmoji', 'predictions']),*/
    ...mapState(['users', 'predictions']),
    classWithHighestProbability: function() {
      let resultIndex = 0
      for(let i = 0; i < this.predictions.length; i++){
        if (this.predictions[i].probability > this.predictions[resultIndex].probability) {
          resultIndex = i
        }
      }
      return resultIndex
    }
  }
}
</script>
<style scoped>
.opacity {
  opacity: 0.3;
}
.webcam {
  width: 200;
  height: 200;
}
</style>