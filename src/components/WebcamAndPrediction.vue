<template>
  <v-card color="grey lighten-2" rounded="lg">
    <v-row>
      <v-col cols="6">
        <v-card color="transparent" rounded="lg" outlined class="margin" align="center">
          <v-card-title class="primary--text text-subtitle-1 font-weight-bold">
            <v-icon>mdi-arrow-down-bold</v-icon>
            That's me!
          </v-card-title>

            <div>
              <div v-if="!webcamSetupFinished">
                <v-icon x-large>mdi-webcam</v-icon>
                <p class="text-body-2 grey--text text--darken-3">Please enable your webcam to use Low-Bandwith-Video-Chat.</p>
                <v-progress-circular color="primary" indeterminate v-if="webcamIsLoading"></v-progress-circular>
              </div>
              <v-avatar color="grey lighten-1" size="150" v-if="webcamSetupFinished">
                <div ref="webcam" class="webcam"></div>
              </v-avatar>
            </div>

        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="transparent" outlined height="100%" align="center">
          <v-card-title class="primary--text text-subtitle-1 font-weight-bold">
            <v-icon>mdi-arrow-down-bold</v-icon>
            That's what my peers see!
          </v-card-title>
          <v-card-text>
          <v-avatar size="150" color="grey lighten-1">
            <Emoji :status="currentPrediction" :gender="emojiIdentity.gender" :skinTone="emojiIdentity.skinTone" size="xl"/>
          </v-avatar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
  </v-card>
</template>
<script>
import * as tmImage from "@teachablemachine/image"
import Emoji from '../components/Emoji.vue'

import {
  db
} from '@/store/db'
import { throttle } from 'lodash';
import { mapMutations, mapState } from 'vuex'

export default {
  components: {Emoji},
  data() {
    return {
      model: null,
      webcam: null,
      webcamIsLoading: false,
      url: 'https://teachablemachine.withgoogle.com/models/erVKbrLsV/',
      webcamSetupFinished: false
    }
  },
  watch: {
    userKey () {
      // onboarding and initialization over when user key set
      // request webcam
      this.requestWebcam()
    }
  },
  computed: {
    ...mapState(['users', 'predictions', 'currentPrediction', 'userKey', 'emojiIdentity']),
    currentState: function() {
      switch (this.currentPrediction) {
        case 'present':
          return 'present'
        case 'not present':
          return 'not-present'
        case 'hand raised':
          return 'hand-raised'
        default:
          return 'no-webcam';
      }
    },
    classWithHighestProbability: function() {
      let resultIndex = 0
      for(let i = 0; i < this.predictions.length; i++){
        if (this.predictions[i].probability > this.predictions[resultIndex].probability) {
          resultIndex = i
        }
      }
      return resultIndex
    },
  },
  methods: {
    ...mapMutations(['setPredictions']),
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
      }, 1000);
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
      setTimeout(function(){ window.requestAnimationFrame(that.loop) }, 500);
      
    },
    async predict() {
      this.setPredictions(await this.model.predict(this.webcam.canvas))
      console.log(this.predictions[this.classWithHighestProbability].className)
      this.$store.commit('setCurrentPrediction', this.predictions[this.classWithHighestProbability].className)
      this.updateStatusAsync()

    },
    updateStatusAsync: throttle(function() {
      console.log('userKey', this.userKey)
      
      // how can we make sure that this is not fired every millisec?
      db.ref('users').child(this.userKey).update({
        status: this.predictions[this.classWithHighestProbability].className
      })
    }, 200),
  }
}
</script>