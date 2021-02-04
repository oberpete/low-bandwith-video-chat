<template>
  <span>
    <p :class="sizeClass">{{ emoji }}</p>
  </span>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: {
    'status': String,
    'skinTone': String,
    'gender': String,
    'heartEmojiColor': String,
    'notPresentEmojiType': String,
    'size': String
  },
  computed: {
    sizeClass: function() {
      switch (this.size) {
        case 'xl':
          return 'text-h1'
        case 'lg':
          return 'text-h2'
        case 'md':
          return 'text-h3'
        case 'sm':
          return 'text-h4'
        default:
          return 'text-h3'
      }
    },
    emojiProvidesSkinColor: function() {
      return true
    },
    emoji: function() {
      switch (this.status) {
        case 'hand-raised':
          return this.raiseHandEmoji
        case 'present':
          return this.presentEmoji
        case 'thumbs-up':
          return this.thumbsUpEmoji
        case 'heart':
          return this.heartEmoji
        case 'not-present':
          return this.notPresentEmoji
        case 'no-camera':
          return '❌'
        default:
          return '❓'
      }
    },
    presentEmoji: function() {
      switch (this.skinTone) {
        case 'light':
          switch (this.gender) {
            case 'male':
              return '👨🏻'
            case 'female':
              return '👩🏻'
            default:
              return '🧑🏻'
          }
        case 'medium-light':
          switch (this.gender) {
            case 'male':
              return '👨🏼'
            case 'female':
              return '👩🏼'
            default:
              return '🧑🏼'
          }
        case 'medium':
          switch (this.gender) {
            case 'male':
              return '👨🏽'
            case 'female':
              return '👩🏽'
            default:
              return '🧑🏽'
          }
        case 'medium-dark':
          switch (this.gender) {
            case 'male':
              return '👨🏾'
            case 'female':
              return '👩🏾'
            default:
              return '🧑🏾'
          }
        case 'dark':
          switch (this.gender) {
            case 'male':
              return '👨🏿'
            case 'female':
              return '👩🏿'
            default:
              return '🧑🏿'
          }
        default:
          switch (this.gender) {
            case 'male':
              return '👨'
            case 'female':
              return '👩'
            default:
              return '🧑'
          }
      }
    },
    raiseHandEmoji: function() {
      switch (this.skinTone) {
        case 'light':
          switch (this.gender) {
            case 'male':
              return '🙋🏻‍♂️'
            case 'female':
              return '🙋🏻‍♀️'
            default:
              return '🙋🏻'
          }
        case 'medium-light':
          switch (this.gender) {
            case 'male':
              return '🙋🏼‍♂️'
            case 'female':
              return '🙋🏼‍♀️'
            default:
              return '🙋🏼'
          }
        case 'medium':
          switch (this.gender) {
            case 'male':
              return '🙋🏽‍♂️'
            case 'female':
              return '🙋🏽‍♀️'
            default:
              return '🙋🏽'
          }
        case 'medium-dark':
          switch (this.gender) {
            case 'male':
              return '🙋🏾‍♂️'
            case 'female':
              return '🙋🏾‍♀️'
            default:
              return '🙋🏾'
          }
        case 'dark':
          switch (this.gender) {
            case 'male':
              return '🙋🏿‍♂️'
            case 'female':
              return '🙋🏿‍♀️'
            default:
              return '🙋🏿'
          }
        default:
          switch (this.gender) {
            case 'male':
              return '🙋‍♂️'
            case 'female':
              return '🙋‍♀️'
            default:
              return '🙋'
          }
      }
    },
    thumbsUpEmoji: function() {
      switch (this.skinTone) {
        case 'light':
          return '👍🏻'
        case 'medium-light':
          return '👍🏼'
        case 'medium':
          return '👍🏽'
        case 'medium-dark':
          return '👍🏾'
        case 'dark':
          return '👍🏿'
        default:
          return '👍'
      }
    },
    heartEmoji: function() {
      switch(this.heartEmojiColor) {
        case 'red':
          return '❤️' 
        case 'orange':
          return '🧡'
        case 'yellow':
          return '💛'
        case 'green':
          return '💚'
        case 'blue':
          return '💙'
        case 'purple':
          return '💜'
        case 'black':
          return '🖤'
        case 'white':
          return '🤍'
        case 'brown':
          return '🤎'  
        default:
          return '❤️'
      }
    },
    notPresentEmoji: function() {
      switch(this.notPresentEmojiType) {
        case 'coffee':
          return '☕️' 
        case 'tea':
          return '🍵'
        case 'juice':
          return '🧃'
        case 'beer':
          return '🍺'
        case 'wine':
          return '🍷'
        default:
          return '☕️'
      }
    },
  },
  methods: {

  },
  mounted() {



  }
}
</script>