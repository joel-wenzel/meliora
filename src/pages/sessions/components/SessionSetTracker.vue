<template>
  <m-number-tapper
    v-model="setReps"
    :dormant="!sessionSet.started"
    decrement
    :max="targetReps * 2"
    :target="targetReps"
    @input="onInput"
  ></m-number-tapper>
</template>

<script lang="ts">
import MNumberTapper from '../../../components/number-tapper/MNumberTapper.vue'
import { defineComponent, ref } from '@vue/composition-api'
import SessionExerciseSet from 'src/store/sessions/session-exercise-set.orm'

export default defineComponent({
  components: { MNumberTapper },
  props: {
    sessionSetId: {
      type: String,
      required: true,
    },
    targetReps: {
      type: Number,
      required: true,
    },
  },
  setup(_props) {
    const sessionSet = SessionExerciseSet.find(
      _props.sessionSetId
    ) as SessionExerciseSet

    const setReps = ref<number>(
      sessionSet.started ? sessionSet.reps : _props.targetReps
    )

    function onInput() {
      SessionExerciseSet.update({
        where: sessionSet.id,
        data: {
          started: true,
          reps: setReps.value,
        },
      })
    }
    return { setReps, onInput, sessionSet }
  },
})
</script>
