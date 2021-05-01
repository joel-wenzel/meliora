<template>
  <q-card flat>
    <q-item>
      <q-item-section>
        <q-item-label class="text-body1">{{
          sessionExercise.workoutExercise.exercise.name
        }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label caption>Target: {{ sessionTarget }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-card-section class="row q-pt-xs">
      <session-set-tracker
        v-for="set in sessionExercise.sessionExerciseSets"
        :key="set.id"
        :sessionSetId="set.id"
        :targetReps="sessionExercise.workoutExercise.targetReps"
        class="q-mr-sm"
      ></session-set-tracker>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import SessionSetTracker from './SessionSetTracker.vue'
import { computed, defineComponent } from '@vue/composition-api'
import SessionExercise from 'src/store/sessions/session-exercise.orm'

export default defineComponent({
  props: {
    sessionExerciseId: {
      type: String,
      required: true,
    },
  },
  components: { SessionSetTracker },
  setup(_props, _ctx) {
    const sessionExercise = computed(
      () =>
        SessionExercise.query()
          .withAllRecursive()
          .find(_props.sessionExerciseId) as SessionExercise
    )

    const sessionTarget = computed(() => {
      const woEx = sessionExercise.value.workoutExercise
      return `${woEx.targetSets}x${woEx.targetReps} at ${woEx.exercise.targetWeight} lbs`
    })

    return { sessionExercise, sessionTarget }
  },
})
</script>

<style scoped></style>
