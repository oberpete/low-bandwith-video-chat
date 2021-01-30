<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Introduction</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Set your nickname</v-stepper-step>

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

        <v-btn color="primary" @click="e1 = 2">Continue</v-btn>

        <v-btn text @click="sendCloseEvent" :disabled="newUser" >Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        To make sure that others recognize you please set your unique nickname for this chat!
        <v-form v-model="valid">
          <v-container>
            <v-text-field v-model="nickname" :rules="nameRules" label="Nickname" required></v-text-field>
          </v-container>
        </v-form>

        <v-btn color="primary" @click="e1 = 3" :disabled="!valid">Continue</v-btn>

        <v-btn text @click="sendCloseEvent" :disabled="newUser">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">

        You can customize the color and gender of your emojis to fit your preferences as well:
        <v-card flat>
          <v-card-text>

            <v-container fluid>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  Color:
                  <v-radio-group v-model="emojiColor" column>
                    <v-radio label="👋" color="yellow" value="skinColorDefault"></v-radio>
                    <v-radio label="👋🏻" color="red darken-3" value="skinColor1"></v-radio>
                    <v-radio label="👋🏼" color="indigo" value="skinColor2"></v-radio>
                    <v-radio label="👋🏽" color="indigo darken-3" value="skinColor3"></v-radio>
                    <v-radio label="👋🏾" color="orange" value="skinColor4"></v-radio>
                    <v-radio label="👋🏿" color="orange darken-3" value="skinColor5"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  Gender:
                  <v-radio-group v-model="emojiGender" column>
                    <v-radio label="👩" color="red" value="male"></v-radio>
                    <v-radio label="👨" color="indigo" value="female"></v-radio>
                    <v-radio label="👋🏽" color="indigo darken-3" value="genderneutral"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        <v-btn color="primary" @click="sendCloseEvent">Continue</v-btn>

        <v-btn text @click="sendCloseEvent" :disabled="newUser">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  export default {
    data() {
      return {
        e1: 1,
        emojiColor: "skinColorDefault",
        emojiGender: "female",
        valid: false,
        nickname: "",
        nameRules: [v => !!v || "Nickname is required"],
        newUser: true,
      };
    },
    methods: {
      sendCloseEvent: function () {
        this.$emit("close-dialogue", {nickname: this.nickname, emojiColor: this.emojiColor, emojiGender: this.emojiGender});
      }
    }
  };
</script>