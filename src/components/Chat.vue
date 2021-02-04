<template>
  <v-card elevation="2" class="mt-4">
    <v-card-title class="pb-0">
      <v-icon color="primary" class="mr-2">mdi-message</v-icon>
      <span class="primary--text font-weight-bold">Chat</span>
    </v-card-title>
    <v-card-text>
      <div v-for="(msg, i) in msgs" v-bind:key="'chatmsg' + i" class="mb-2">
        <div class="font-weight-bold primary--text">{{ msg.name }}</div>
        <v-chip color="grey lighten-4">{{ msg.text }}</v-chip>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-text-field outlined hide-details append-icon="mdi-send"></v-text-field>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Chat",

  data: () => ({
    msgs: [
      {
        name: "Lisa",
        text: "Hey guys, thanks for taking time for a quick meeting!"
      },
      {
        name: "Marcus",
        text: "sure, anytime!"
      },
      {
        name: "Jeff",
        text:
          "How long is it gonna take? I've got another meeting in about an hr or so"
      }
    ]
  })
};
</script>
