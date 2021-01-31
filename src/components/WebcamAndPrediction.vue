<template>
  <v-card color="grey lighten-2" rounded="lg">
    <v-row>
      <v-col cols="6">
        <v-card color="transparent" rounded="lg" outlined class="margin" align="center">
          <v-card-title class="primary--text text-subtitle-1 font-weight-bold">
            <v-icon>mdi-arrow-down-bold</v-icon>
            That's me!
          </v-card-title>
          <div class="webcam" ref="webcam"></div>
        </v-card>
      </v-col>
      <v-col cols="6" v-if="predictions.length > 0 && classWithHighestProbability >= 0" v-bind:key="predictions[classWithHighestProbability].className">
        <v-card color="transparent" outlined height="100%" align="center">
          <v-card-title class="primary--text text-subtitle-1 font-weight-bold">
            <v-icon>mdi-arrow-down-bold</v-icon>
            That's what my peers see!
          </v-card-title>
          <v-card-text>
          <v-avatar size="150" color="grey lighten-1">
            <p class="text-h1">
              {{ getEmojiByCurrentPrediction() }}
            </p>
            <Emoji/>
          </v-avatar>
          <button
              right
              class="reply--button justify-right v-btn v-btn--contained theme--light v-size--default my-auto ml-3 mt-2" 
              @click.prevent="setNewEmoji">
              <i aria-hidden="true" class="v-icon notranslate mr-1 mdi mdi-send theme--light primary--text" style="font-size: 20px;"> </i>Change Emoji
          </button>
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
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  components: {Emoji},
  data() {
    return {
      model: null,
      webcam: null,
      url: 'https://teachablemachine.withgoogle.com/models/erVKbrLsV/',
    }
  },
  computed: {
    ...mapState(['users', 'predictions', 'currentPrediction', 'userKey']),
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
    ...mapGetters(['getEmojiByCurrentPrediction']),
    ...mapMutations(['setPredictions']),
    async loop() {
      var that = this
      console.log(this.userKey)
      // check if user initialization finished
      if (this.userKey) {
        that.webcam.update()
        await this.predict()
      }
      // timeout could be increased to improve performance
      setTimeout(function(){ window.requestAnimationFrame(that.loop) }, 1000);
      
    },
    async predict() {
      this.setPredictions(await this.model.predict(this.webcam.canvas))
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
  },
  async mounted() {
    const modelURL = `${this.url}model.json`
    const metadataURL = `${this.url}metadata.json`
    const webcamContainer = this.$refs.webcam
    const flip = true // whether to flip the webcam
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    this.model = await tmImage.load(modelURL, metadataURL)
    // Convenience function to setup a webcam
    /*this.webcam = new tmImage.Webcam(
      webcamContainer.width,
      webcamContainer.height,
      flip
    )*/ // width, height, flip
    this.webcam = new tmImage.Webcam(
      200,
      200,
      flip
    ) 
    await this.webcam.setup() // request access to the webcam
    await this.webcam.play()
    webcamContainer.appendChild(this.webcam.canvas)
    
    window.requestAnimationFrame(this.loop)
  }
}
</script>