<template>
  <q-footer class="m-primary-container">
    <q-tabs dense no-caps class="shadow-2" :content-class="textColor">
      <q-route-tab
        name="sessions"
        icon="mdi-clock-check"
        to="/sessions"
        :disable="!hasWorkouts"
        label="sessions"
        exact
      />

      <q-route-tab
        name="history"
        icon="mdi-history"
        to="/history"
        :disable="!hasWorkouts"
        label="history"
        exact
      />
      <q-route-tab
        name="charts"
        icon="mdi-chart-timeline-variant"
        to="/charts"
        :disable="!hasWorkouts"
        label="charts"
        exact
      />
      <q-route-tab
        name="workouts"
        icon="mdi-dumbbell"
        to="/workouts"
        label="workouts"
        exact
      />
    </q-tabs>
  </q-footer>
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import Workout from 'src/store/workouts/workout.orm'

export default defineComponent({
  setup(_props, _ctx) {
    const textColor = computed(() =>
      _ctx.root.$q.dark.isActive ? 'text-primary-light' : ''
    )

    const hasWorkouts = computed(() => Workout.exists())

    return { textColor, hasWorkouts }
  },
})
</script>
