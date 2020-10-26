<template>
  <div>Ich bin der Intent: {{ $route.meta.title }}
    <div v-if="dataReady">
      {{ answers }}
    </div>
  </div>
</template>

<script>
import { getAnswersforIntent } from '@/api/user'
export default {
  name: 'Intent',
  props: {},
  data() {
    return {
      dataReady: false,
      answers: []
    }
  },
  created() {},
  async mounted() {
    this.answers = await getAnswersforIntent(this.$route.meta.title)
    // now the data is filled and can be used
    this.dataReady = true
  },
  methods: {}
}
</script>
