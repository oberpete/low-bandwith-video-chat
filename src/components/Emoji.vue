<template>
  <span>
    {{ emoji }}
  </span>
</template>
<script>
export default {
  data() {
    return {
      emoji: ''
    }
  },
  props: {
    'status': String,
    'skinColor': String,
    'gender': String
  },
  created() {
    this.emoji = '🧑‍💼'
  }
}
</script>