<template>
  <q-card flat>
    <q-item>
      <q-item-section>
        <q-item-label class="text-body1">{{
          sessionExercise.workoutExercise.exercise.name
        }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label v-if="!exerciseComplete" caption
          >Target: {{ sessionTarget }}</q-item-label
        >
        <transition enter-active-class="animated slideInUp">
          <q-item-label v-if="exerciseComplete && exerciseSuccess" caption>
            <q-badge color="positive" class="q-pa-xs"
              >Completed: {{ sessionTarget }}</q-badge
            >
          </q-item-label>

          <q-item-label v-if="exerciseComplete && !exerciseSuccess" caption>
            <q-badge color="negative" class="q-pa-xs">Not quite</q-badge>
          </q-item-label>
        </transition>
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

    const exerciseComplete = computed(() => {
      return sessionExercise.value.sessionExerciseSets.every(
        (set) => set.complete
      )
    })

    const exerciseSuccess = computed(() => {
      return sessionExercise.value.sessionExerciseSets.every(
        (set) => set.reps >= sessionExercise.value.workoutExercise.targetReps
      )
    })

    return { sessionExercise, sessionTarget, exerciseComplete, exerciseSuccess }
  },
})
</script>

<style scoped></style>
