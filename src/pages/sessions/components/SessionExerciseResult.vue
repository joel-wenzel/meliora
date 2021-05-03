<template>
  <q-item dense class="q-pa-none" v-if="sExercise && sets">
    <q-item-section>
      {{ sExercise.exercise.name }}
    </q-item-section>
    <q-item-section>
      <q-item-label class="row items-center">
        <span style="line-height: 1px" class="q-pr-xs"
          >{{ sets.length }} x {{ reps }}</span
        >
        <q-icon
          v-if="inconsistentReps"
          name="mdi-information"
          color="info"
        ></q-icon>
      </q-item-label>
    </q-item-section>
    <q-item-section>{{ Math.round(weight) }} {{ $labels.uom }}</q-item-section>
  </q-item>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import SessionExercise from 'src/store/sessions/session-exercise.orm'

export default defineComponent({
  props: {
    sessionExerciseId: {
      type: String,
      required: true,
    },
  },
  setup(_props, _ctx) {
    const sExercise = computed(
      () =>
        SessionExercise.query()
          .with(['sessionExerciseSets', 'exercise'])
          .find(_props.sessionExerciseId) as SessionExercise
    )

    const weight = computed(() => sExercise.value?.weight)

    const sets = computed(() => sExercise.value?.sessionExerciseSets)

    const reps = computed(() => sets.value[0]?.reps)

    const inconsistentReps = computed(
      () => !sets.value.every((set) => set.reps === reps.value)
    )

    return { sExercise, weight, sets, reps, inconsistentReps }
  },
})
</script>
