<template>
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
    <template #before-options>
      <q-input
        v-model="newExerciseText"
        class="q-px-md"
        placeholder="Add Exercise"
        @keydown.enter="createExercise"
      >
        <template #append>
          <q-btn color="secondary" outline unelevated @click="createExercise"
            >Add</q-btn
          >
        </template>
      </q-input>
    </template>
  </q-select>
</template>
<script lang="ts">
import { Exercise } from '@/model/workout.model'
import {
  computed,
  defineComponent,
  Ref,
  ref,
  SetupContext,
  watch,
} from '@vue/composition-api'
import { QSelect } from 'node_modules/quasar/dist/types'

export default defineComponent({
  setup(_props, _ctx) {
    const exerciseSelect = ref<QSelect>()

    const exerciseList = computed(() => {
      return _ctx.root.$store.getters.exercises as Array<Exercise>
    })

    // really wouldn't think i would need to do this
    watch(exerciseList, () => {
      exerciseSelect.value?.refresh()
    })

    return {
      exerciseList,
      exerciseSelect,
      ...setupNewExercise(exerciseList, exerciseSelect, _ctx),
    }
  },
})

function setupNewExercise(
  exerciseList: Ref,
  exerciseSelect: Ref,
  ctx: SetupContext
) {
  const newExerciseText = ref<string>('')

  async function createExercise() {
    if (newExerciseText.value.length > 0) {
      let selected = exerciseList.value.find(
        (ex) => ex.name === newExerciseText.value
      )
      if (!selected) {
        selected = await ctx.root.$store.dispatch('addExercise', {
          name: newExerciseText.value,
        })
      }
      newExerciseText.value = ''
      ctx.emit('input', selected.id)
      exerciseSelect.value.hidePopup()
    }
  }

  return { createExercise, newExerciseText }
}
</script>
