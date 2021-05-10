<template>
  <q-card flat>
    <q-item>
      <q-item-section>
        <q-item-label class="text-body1">{{
          sessionExercise.exercise.name
        }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label caption>
          <session-exercise-target
            :sessionExerciseId="sessionExerciseId"
            :state="state"
          ></session-exercise-target>
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-card-section class="row q-pt-xs">
      <session-set-tracker
        v-for="set in sessionExercise.sessionExerciseSets"
        :key="set.id"
        :sessionSetId="set.id"
        :readonly="readonly"
        :targetReps="sessionExercise.targetReps"
        class="q-mr-sm"
      ></session-set-tracker>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import SessionExerciseTarget from './SessionExerciseTarget.vue'
import SessionSetTracker from './SessionSetTracker.vue'
import { computed, defineComponent, watch } from '@vue/composition-api'
import SessionExercise from 'src/store/sessions/session-exercise.orm'

export default defineComponent({
  props: {
    sessionExerciseId: {
      type: String,
      required: true,
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: { SessionSetTracker, SessionExerciseTarget },
  setup(_props, _ctx) {
    const sessionExercise = computed(
      () =>
        SessionExercise.query()
          .withAllRecursive()
          .find(_props.sessionExerciseId) as SessionExercise
    )

    const exerciseComplete = computed(() => {
      return sessionExercise.value.sessionExerciseSets.every(
        (set) => set.complete
      )
    })

    const exerciseSuccess = computed(() => {
      return sessionExercise.value.sessionExerciseSets.every(
        (set) => set.reps >= sessionExercise.value.targetReps
      )
    })

    const state = computed(() => {
      if (exerciseComplete.value && exerciseSuccess.value) {
        return 'COMPLETE'
      } else if (exerciseComplete.value) {
        return 'FAILED'
      } else return 'PENDING'
    })

    return { sessionExercise, state }
  },
})
</script>

<style scoped></style>
