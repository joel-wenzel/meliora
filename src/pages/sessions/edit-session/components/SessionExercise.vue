<template>
  <q-card flat>
    <q-item>
      <q-item-section>
        <q-item-label class="text-body1">
          <q-expansion-item
            v-if="sessionExercise.exercise.notes"
            class="m-exercise-expand"
            expand-separator
            :label="sessionExercise.exercise.name"
            :caption="'Show notes'"
            header-class="text-no-wrap q-pl-none"
          >
            <p class="text-caption q-mb-none">
              {{ sessionExercise.exercise.notes }}
            </p>
          </q-expansion-item>
          <span v-else>{{ sessionExercise.exercise.name }}</span>
        </q-item-label>
      </q-item-section>
      <q-item-section side top>
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
import { computed, defineComponent } from '@vue/composition-api'
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

<style scoped>
.m-exercise-expand ::v-deep .q-item__label--caption {
  width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
