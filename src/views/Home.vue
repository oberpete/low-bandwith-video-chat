<template>
  <v-container>
    <v-row>
      <span class="text-h4 font-weight-bold primary--text">
        Very Important Meeting
      </span>
    </v-row>
    <v-row>
      <v-col>
        <v-card color="grey lighten-2" rounded="lg">
          <v-row>
            <v-col cols="6">
              <v-card color="transparent" rounded="lg" outlined class="margin" align="center">
                <v-card-title class="primary--text text-subtitle-1 font-weight-bold">
                  <v-icon>mdi-arrow-down-bold</v-icon>
                  That's me!
                </v-card-title>
                <div ref="webcam"></div>
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
                    {{getEmoji(predictions[classWithHighestProbability].className)}}
                  </p>
                </v-avatar>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          
        </v-card>
        <Peers />
      </v-col>
      <v-col v-if="predictions.length > 0 && classWithHighestProbability >= 0" v-bind:key="predictions[classWithHighestProbability].className">
        <Chat />
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
  </v-container>
</template>

<script>
import '@tensorflow/tfjs'
import * as tmImage from "@teachablemachine/image"
import Peers from '../components/Peers.vue'
import Chat from '../components/Chat.vue'
export default {
  components: {
     Peers, Chat
  },
  data() {
    return {
      model: null,
      webcam: null,
      predictions: [],
      classWithHighestProb: -1,
      url: 'https://teachablemachine.withgoogle.com/models/erVKbrLsV/'
    }
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
  },
  methods: {
    async loop() {
      var that = this
      that.webcam.update()
      await this.predict()
      // timeout could be increased to improve performance
      setTimeout(function(){ window.requestAnimationFrame(that.loop) }, 300);
      
    },
    async predict() {
      this.predictions = await this.model.predict(this.webcam.canvas)
    },
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
    getEmoji: function(className) {
      switch (className) {
        case 'present':
          return '👩‍💼'
        case 'not present':
          return '☕'
        case 'hand raised':
          return '🙋'
        default:
          return 'mdi-exclamation-thick'
      }
    }
  },
  computed: {
    classWithHighestProbability: function() {
      let resultIndex = 0
      for(let i = 0; i < this.predictions.length; i++){
        if (this.predictions[i].probability > this.predictions[resultIndex].probability) {
          resultIndex = i
        }
      }
      return resultIndex
    },
  }
}
</script>
<style scoped>
.opacity {
  opacity: 0.3;
}
</style>