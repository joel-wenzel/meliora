<template>
  <div>
    <q-select
      filled
      input-debounce="0"
      no-error-icon
      label="Select Exercise"
      :options="exerciseList"
      option-value="id"
      option-label="name"
      emit-value
      map-options
      ref="exerciseSelect"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template #no-option>
        <m-create-exercise-input
          @selected="onExerciseSelect"
        ></m-create-exercise-input>
      </template>
      <template #before-options>
        <m-create-exercise-input
          @selected="onExerciseSelect"
        ></m-create-exercise-input>
      </template>
    </q-select>
  </div>
</template>
<script lang="ts">
import MCreateExerciseInput from 'src/components/exercise/create-exercise-input/MCreateExerciseInput.vue'
import {
  computed,
  defineComponent,
  Ref,
  ref,
  SetupContext,
  watch,
} from '@vue/composition-api'
import { QSelect } from 'node_modules/quasar/dist/types'
import Exercise from 'src/store/exercises/exercise.orm'

export default defineComponent({
  components: { MCreateExerciseInput },
  setup(_props, _ctx) {
    const exerciseSelect = ref<QSelect>()

    const exerciseList = computed(() => Exercise.all())

    // really wouldn't think i would need to do this
    watch(exerciseList, () => {
      exerciseSelect.value?.refresh()
    })

    return {
      exerciseList,
      exerciseSelect,
      ...setupNewExercise(exerciseSelect, _ctx),
    }
  },
})

function setupNewExercise(exerciseSelect: Ref, ctx: SetupContext) {
  function onExerciseSelect(exercise: Exercise) {
    ctx.emit('input', exercise.id)
    exerciseSelect.value.hidePopup()
  }

  return {
    onExerciseSelect,
  }
}
</script>
