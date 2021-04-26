<template>
  <form>
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
  </form>
</template>

<script lang="ts">
import Exercise from '../../../store/exercises/exercise.orm'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  emits: ['selected'],
  props: {},
  setup(_props, _ctx) {
    const newExerciseText = ref<string>('')

    async function createExercise() {
      if (newExerciseText.value.length > 0) {
        const exercise = await Exercise.createNew(newExerciseText.value)
        newExerciseText.value = ''
        _ctx.emit('selected', exercise)
      }
    }

    return { newExerciseText, createExercise }
  },
})
</script>
