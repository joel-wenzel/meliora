<template>
  <q-btn-dropdown
    split
    color="primary"
    :label="`Start ${nextWorkout.name}`"
    icon="mdi-clock-outline"
    @click="startSession(nextWorkout.id)"
  >
    <q-list>
      <q-item
        v-for="workout in workouts"
        :key="workout.id"
        clickable
        v-close-popup
      >
        <q-item-section avatar>
          <q-icon name="mdi-dumbbell" color="secondary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ workout.name }}</q-item-label>
          <q-item-label caption>February 22, 2016</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import Session from 'src/store/sessions/session.orm'
import Workout from 'src/store/workouts/workout.orm'

export default defineComponent({
  setup(_props, _ctx) {
    const workouts = Workout.all()

    const nextWorkout = computed(() => {
      const lastSession = Session.query().limit(1).orderBy('date').get()[0]
      const lastWorkoutId = lastSession?.workoutId
      if (lastWorkoutId) {
        const lastIndex = workouts.findIndex((wo) => wo.id === lastWorkoutId)
        return workouts[lastIndex % workouts.length]
      } else return workouts[0]
    })

    function startSession(workoutId: string) {
      _ctx.emit('start', workoutId)
    }

    return { startSession, workouts, nextWorkout }
  },
})
</script>
