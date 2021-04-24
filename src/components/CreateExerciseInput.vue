<template>
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

<script lang="ts">
import { Exercise } from '@/model/workout.model'
import { computed, defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  emits: ['selected'],
  props: {
    defaultWeight: {
      type: Number,
      required: false,
      default: 75,
    },
  },
  setup(_props, _ctx) {
    const newExerciseText = ref<string>('')

    const exerciseList = computed(() => {
      return _ctx.root.$store.getters.exercises as Array<Exercise>
    })

    async function createExercise() {
      if (newExerciseText.value.length > 0) {
        let isNewExercise = false
        let selected = exerciseList.value.find(
          (ex) => ex.name === newExerciseText.value
        )
        if (!selected) {
          isNewExercise = true
          selected = await _ctx.root.$store.dispatch('addExercise', {
            name: newExerciseText.value,
            //subtract five pounds so the first session starts at the default weight
            lastWeightLifted: _props.defaultWeight - 5,
          })
        }
        newExerciseText.value = ''
        _ctx.emit('selected', {
          exercise: selected,
          isNew: isNewExercise,
        })
      }
    }

    return { newExerciseText, createExercise }
  },
})
</script>
