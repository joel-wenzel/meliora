<template>
  <q-page>
    <exercise-chart></exercise-chart>
  </q-page>
</template>

<script setup lang="ts">
import ExerciseChart from './components/ExerciseChart.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: { ExerciseChart },
  setup() {
    return {}
  },
})
</script>

<style scoped></style>
