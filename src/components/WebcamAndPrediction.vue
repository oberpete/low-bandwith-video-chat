<template>
  <v-card color="grey lighten-4" elevation="12">
    <v-row>
      <v-col cols="12" md="6">
        <v-card flat color="transparent" rounded="lg" class="margin" align="center">
          <v-card-text>
            <div>
              <div v-if="!webcamSetupFinished">
                <v-icon x-large>mdi-webcam</v-icon>
                <p class="text-body-2 grey--text text--darken-3">Please enable your webcam to use Low-Bandwith-Video-Chat.</p>
                <v-progress-circular color="primary" indeterminate v-if="webcamIsLoading"></v-progress-circular>
              </div>
              <v-avatar color="linenLighter" size="150" v-if="webcamSetupFinished">
                <div ref="webcam" class="webcam"></div>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card color="transparent" outlined height="100%" align="center">
          <v-card-text>
          <v-avatar size="155" color="primaryAccent3">
            <Emoji :status="currentState" :gender="emojiIdentity.gender" :skinTone="emojiIdentity.skinTone" :heartEmojiColor="heartEmojiColor" :notPresentEmojiType="notPresentEmojiType" size="xl"/>
          </v-avatar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense class="pa-2">
      <v-col cols="6" v-for="predictionClass in statesImplemented" v-bind:key="predictionClass.className">
        <v-card flat height="100%" :class="predictionClass.className === currentPrediction.className ? 'primaryAccent2' : 'primaryAccent3'">
          <v-card-text class="pt-0">
            <v-row>
              <v-col cols="4">
                <v-avatar tile size="30">
                  <v-img contain :src="predictionClass.icon"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="8">
                <span :class="predictionClass.className === currentPrediction.className ? 'text-overline font-weight-black primary--text' : 'text-overline'">
                  {{ predictionClass.className }}
                </span>
              </v-col>
            </v-row>
          
          <v-progress-linear
            :value="predictionClass.className === currentPrediction.className ? getProgressBarValue : 0"
            stream
            buffer-value="0"
            color="primary"
          ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>
      <v-row class="text-center" no-gutters>
        <v-col>
          <p class="text-caption primaryAccent1--text mb-0">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
        </v-col>
      </v-row>
    </v-row>
    
  </v-card>
</template>
<script>
import * as tmImage from "@teachablemachine/image"
import Emoji from '../components/Emoji.vue'

import {
  db
} from '@/store/db'
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  components: {Emoji},
  data() {
    return {
      model: null,
      webcam: null,
      webcamIsLoading: false,
      url: 'https://teachablemachine.withgoogle.com/models/erVKbrLsV/',
      webcamSetupFinished: false,
      statesImplemented: [
        {
          className: 'present',
          icon: require('../assets/present.svg')
        },
        {
          className: 'not-present',
          icon: require('../assets/not_present.svg')
        },
        {
          className: 'hand-raised',
          icon: require('../assets/hand_raised.svg')
        },
        {
          className: 'thumbs-up',
          icon: require('../assets/hand_thumbs_up.svg')
        },
        {
          className: 'heart',
          icon: require('../assets/hand_heart.svg')
        }
      ]
    }
  },
  watch: {
    userKey () {
      // onboarding and initialization over when user key set
      // request webcam
      this.requestWebcam()
    },
    currentPrediction (prediction) {
      if (this.currentState !== prediction.className && prediction.noOfConsecutiveLoops > 4) {
        this.setCurrentState(prediction.className)
        this.updateStatusInDB()
      }
    }
  },
  computed: {
    ...mapState(['users', 'currentPrediction', 'predictions', 'userKey', 'emojiIdentity', 'currentState', 'heartEmojiColor', 'notPresentEmojiType']),
    ...mapGetters(['classWithHighestValueFromLatestPrediction']),    
    getProgressBarValue: function() {
      if (this.currentPrediction.noOfConsecutiveLoops < 5) {
        return (this.currentPrediction.noOfConsecutiveLoops * 25)
      } else {
        return 100
      }
    }
  },
  methods: {
    ...mapMutations(['setPrediction', 'setCurrentState']),
    async requestWebcam() {
      var that = this
      const modelURL = `${this.url}model.json`
      const metadataURL = `${this.url}metadata.json`
      
      // flip camera b/c teachable machine camera was flipped as well
      const flip = true 

      this.model = await tmImage.load(modelURL, metadataURL)

      this.webcam = new tmImage.Webcam(
        150,
        150,
        flip
      ) 
      await this.webcam.setup() // request access to the webcam
      this.webcamIsLoading = true
      await this.webcam.play()
      this.webcamSetupFinished = true
      
      setTimeout(function(){ 
        const webcamContainer = that.$refs.webcam
        webcamContainer.appendChild(that.webcam.canvas)
      }, 500);
      window.requestAnimationFrame(this.loop)
    },
    async loop() {
      var that = this

      // check if user initialization finished
      if (this.userKey) {
        that.webcam.update()
        await this.predict()
      }
      // timeout could be increased to improve performance
      setTimeout(function(){ window.requestAnimationFrame(that.loop) }, 300);
      
    },
    async predict() {
      this.setPrediction(await this.model.predict(this.webcam.canvas))
      console.log(this.currentPrediction)
      console.log('predictions', this.predictions)
    },
    updateStatusInDB: function() {
      // how can we make sure that this is not fired every millisec?
      db.ref('users').child(this.userKey).update({
        status: this.currentState
      })
    }
  }
}
</script>