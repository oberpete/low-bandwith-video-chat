<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" step="1">Introduction</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="step > 2" step="2">Set your nickname</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Choose your emoji color and gender</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <div>
          Do you want to chat with your friends or take part in a school meeting, but your wifi can't handle all that
          video bandwith? Fret no more!
          Our low-bandwith video chat will analyze your video feed without needing to send all that data to your friends
          and colleagues. All you need to get started is to choose your preferred emoji style and color!
        </div>
        <v-img aspect-ratio="1.7" contain
          src="https://us.123rf.com/450wm/microone/microone1907/microone190700323/128173861-stock-vector-video-conference-people-group-on-computer-screen-taking-with-colleague-video-conferencing-and-online.jpg?ver=6"
          max-height="250" />

        <v-btn tabindex="0" color="primary" @click="step = 2">Continue</v-btn>

        <v-btn text @click="sendCloseEvent" :disabled="newUser" >Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        To make sure that others recognize you please set your unique nickname for this chat!
        <v-form v-on:submit.prevent v-model="valid">
          <v-container>
            <v-text-field v-model="nickname" :rules="nameRules" label="Nickname" required></v-text-field>
          </v-container>
        </v-form>

        <v-btn tabindex="0" color="primary" @click="step = 3" :disabled="!valid">Continue</v-btn>

        <v-btn text @click="sendCloseEvent" :disabled="newUser">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">

        You can customize the color, gender and style of your emojis to fit your preferences as well:
        <v-card flat>
          <v-card-text>

            <v-container fluid>
              <v-row>
                <v-col cols="3">
                  Color:
                  <v-radio-group v-model="emojiColor" column>
                    <v-radio label="👋" color="yellow" value="skinColorDefault"></v-radio>
                    <v-radio label="👋🏻" color="red darken-3" value="light"></v-radio>
                    <v-radio label="👋🏼" color="indigo" value="medium-light"></v-radio>
                    <v-radio label="👋🏽" color="indigo darken-3" value="medium"></v-radio>
                    <v-radio label="👋🏾" color="orange" value="medium-dark"></v-radio>
                    <v-radio label="👋🏿" color="orange darken-3" value="dark"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="3">
                  Gender:
                  <v-radio-group v-model="emojiGender" column>
                    <v-radio label="👩" color="red" value="female"></v-radio>
                    <v-radio label="👨" color="indigo" value="male"></v-radio>
                    <v-radio label="🧑" color="indigo darken-3" value="genderneutral"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="3" >
                  Not Present:
                  <v-radio-group v-model="notPresentEmojiType" column>
                    <v-radio label="☕️" color="red" value="coffee"></v-radio>
                    <v-radio label="🍵" color="indigo" value="tea"></v-radio>
                    <v-radio label="🧃" color="indigo darken-3" value="juice"></v-radio>
                    <v-radio label="🍺" color="orange" value="beer"></v-radio>
                    <v-radio label="🍷" color="orange darken-3" value="wine"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="3">
                  Heart Sign:
                  <v-radio-group v-model="heartEmojiColor" column>
                    <v-radio label="❤️" color="red" value="red"></v-radio>
                    <v-radio label="🧡" color="indigo" value="orange"></v-radio>
                    <v-radio label="💛" color="indigo darken-1" value="yellow"></v-radio>
                    <v-radio label="💚" color="orange" value="green"></v-radio>
                    <v-radio label="💙" color="orange darken-2" value="blue"></v-radio>
                    <v-radio label="💜" color="orange darken-3" value="purple"></v-radio>
                    <v-radio label="🖤" color="orange darken-4" value="black"></v-radio>
                    <v-radio label="🤍" color="orange darken-5" value="white"></v-radio>
                    <v-radio label="🤎" color="orange darken-6" value="brown"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        <v-btn tabindex="0" color="primary" @click="sendCloseEvent">Continue</v-btn>

        <v-btn text @click="sendCloseEvent" :disabled="newUser">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  export default {
    data() {
      return {
        newUser: true,
        step: 1,
        emojiColor: "skinColorDefault",
        emojiGender: "female",
        heartEmojiColor: "red",
        notPresentEmojiType: "coffee",
        valid: false,
        nickname: "",
        nameRules: [v => !!v || "Nickname is required"],
      };
    },
    methods: {
      sendCloseEvent: function () {
        this.step = 2
        this.newUser = false
        this.$emit("close-dialogue", {nickname: this.nickname, emojiColor: this.emojiColor, emojiGender: this.emojiGender, 
                                      heartEmojiColor: this.heartEmojiColor, notPresentEmojiType: this.notPresentEmojiType});
      }
    }
  };
</script>