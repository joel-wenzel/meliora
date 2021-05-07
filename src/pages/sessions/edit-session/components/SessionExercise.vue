<template>
  <q-card flat>
    <q-item>
      <q-item-section>
        <q-item-label class="text-body1">{{
          sessionExercise.exercise.name
        }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label v-if="!exerciseComplete" caption>
          <session-exercise-target
            :sessionExerciseId="sessionExerciseId"
          ></session-exercise-target>
        </q-item-label>
        <transition enter-active-class="animated slideInUp">
          <q-item-label v-if="exerciseComplete && exerciseSuccess" caption>
            <q-badge color="positive" class="q-pa-xs">Completed</q-badge>
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

    watch(exerciseComplete, () => {
      SessionExercise.completeSessionExercise(sessionExercise.value.id)
    })

    const exerciseSuccess = computed(() => {
      return sessionExercise.value.sessionExerciseSets.every(
        (set) => set.reps >= sessionExercise.value.targetReps
      )
    })

    return { sessionExercise, exerciseComplete, exerciseSuccess }
  },
})
</script>

<style scoped></style>
