<template>
  <q-page>
    <exercise-chart v-if="hasEnoughSessions"></exercise-chart>
    <div v-else class="q-pa-md full-height full-width grid-center">
      <span class="text-body1" style="text-align: center"
        >You need at least 3 sessions to view progress!</span
      >
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ExerciseChart from './components/ExerciseChart.vue'
import { computed, defineComponent } from '@vue/composition-api'
import Session from 'src/store/sessions/session.orm'

export default defineComponent({
  components: { ExerciseChart },
  setup() {
    const hasEnoughSessions = computed(() => Session.all().length >= 3)
    return { hasEnoughSessions }
  },
})
</script>

<style scoped></style>
