<template>
  <v-container>
    <v-dialog
      v-model="openDialog"
      width="800"
      :persistent="!newUser"
    >
      <TutorialStepper @close-dialogue="handleCloseDialogue" :newUser="newUser"></TutorialStepper>
    </v-dialog>
    <v-row>
      <v-col cols="12" md="5">
        <WebcamAndPrediction />

      </v-col>
      <v-col cols="12" md="7">
        <Peers />
        <Chat />
      </v-col>
    </v-row>
    <!-- <v-row v-if="predictions" class="opacity">
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
    </v-row> -->
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

import {
    mapState, mapMutations
  } from 'vuex'
import {
  db
} from '@/store/db'


export default {
  components: {
     Peers, Chat, TutorialStepper, WebcamAndPrediction
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
      newUser: true,
    }
  },

  created() {
    document.addEventListener('beforeunload', this.leaving);
    window.addEventListener('beforeunload', this.leaving)
  },

  methods: {
    ...mapMutations(['setUserKey', 'setEmojiIdentity', 'setOpenDialog']),
      
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
    handleCloseDialogue: function({nickname, emojiColor, emojiGender}) {
      this.nickname = nickname
      this.emojiColor = emojiColor
      this.emojiGender = emojiGender
      this.dialog = false

      if (this.newUser) {
        let userKey = db.ref('users').push().getKey()
        this.userKey = userKey
        this.$store.dispatch('addNewUser', {nickname, emojiColor, emojiGender, userKey})
        this.setUserKey(userKey) 
        this.newUser = false
      } else {
        let userKey = this.userKey
        this.$store.dispatch('updateUserSettings', {nickname, emojiColor, emojiGender, userKey})
        this.setUserKey(userKey) 
      }
      this.setOpenDialog(false)
      this.setEmojiIdentity({emojiGender, emojiColor})
      
    },
    leaving: function() {
      let userKey = this.userKey
      this.$store.dispatch('deleteUser', {userKey})
    },
  },
  computed: {
    /*...mapState(['users', 'notPresentEmoji', 'handRaisedEmoji', 'presentEmoji', 'predictions']),*/
    ...mapState(['users', 'currentPrediction', 'openDialog']),
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