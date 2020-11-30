<template>
  <v-container>
    <v-sheet color="primary" rounded="lg">
      <div ref="webcam"></div>
    </v-sheet>
    <v-row v-if="predictions">
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
export default {
  data() {
    return {
      model: null,
      webcam: null,
      predictions: [],
      classWithHighestProb: 0,
      url: 'https://teachablemachine.withgoogle.com/models/5L-T1cpFJ/'
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
    this.webcam = new tmImage.Webcam(
      webcamContainer.width,
      webcamContainer.height,
      flip
    ) // width, height, flip
    await this.webcam.setup() // request access to the webcam
    await this.webcam.play()
    webcamContainer.appendChild(this.webcam.canvas)
    
    window.requestAnimationFrame(this.loop)
  },
  methods: {
    async loop() {
      this.webcam.update()
      await this.predict()
      window.requestAnimationFrame(this.loop)
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