<template>
  <div v-if="dataReady">
    <h1>{{ $route.meta.title }}</h1>
    <el-table :data="answers">
      <el-table-column label="Text" prop="text" />
    </el-table>
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
