<template>
  <v-row no-gutters>
    <v-col cols="6" v-for="peer in users" v-bind:key="peer.name" class="pr-2 pb-2">
      <v-card tile color="primaryAccent3" elevation="0">
        <v-row>
          <v-col cols="4" align="center">
            <span class="text-h2">
              <Emoji :status="peer.status" :gender="peer.emojiColor" :skinTone="peer.emojiGender" size="md"/>
            </span>
          </v-col>
          <v-col cols="8">
            <div class="text-h6 font-weight-bold primary--text">
              {{ peer['nickname'] }}
            </div>
            <div v-if="peer.statusMessage">
              {{ peer.statusMessage }}
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import Emoji from '../components/Emoji.vue'
  import {mapState} from 'vuex'

  export default {
    components: {Emoji},
    computed: {
      ...mapState(['users'])
    },

    methods: {
      getEmojiForPeerAndStatus: function(peer) {
      switch (peer.status) {
        case 'present':
          return peer.presentEmoji
        case 'notPresent':
          return peer.notPresentEmoji
        case 'handRaised':
          return peer.handRaisedEmoji
        default:
          return 'mdi-exclamation-thick'
      }
    }
    }
  }
  
</script>
