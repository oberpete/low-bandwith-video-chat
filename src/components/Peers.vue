<template>
  <v-card class="pa-2" elevation="2">
  <v-row no-gutters>
    <v-col cols="4" v-for="peer in users" v-bind:key="peer.name" class="pa-1">
      <v-card class="pl-3" elevation="0" outlined>
        <v-row>
          <v-col cols="4" align="center">
            <v-avatar size="60" color="linenLighter">
              <Emoji class="mt-3" :status="peer.status" :gender="peer.emojiGender" :skinTone="peer.emojiColor" :heartEmojiColor="peer.heartEmojiColor" :notPresentEmojiType="peer.notPresentEmojiType" size="md"/>
            </v-avatar>
          </v-col>
          <v-col cols="8">
            <div class="text-h6 font-weight-bold primary--text mt-3">
              {{ peer['nickname'] }}
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
  </v-card>
</template>

<script>
  import Emoji from '../components/Emoji.vue'
  import {mapState} from 'vuex'

  export default {
    components: {Emoji},
    computed: {
      ...mapState(['users'])
    }
  }
  
</script>
