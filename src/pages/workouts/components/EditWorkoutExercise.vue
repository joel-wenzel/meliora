<template>
  <q-card>
    <q-card-section>
      <exercise-list v-model="localEx.id" dense></exercise-list>
      <div class="row justify-around q-mt-sm">
        <div>
          <span class="text-label">Target Sets</span>
          <q-knob
            show-value
            class="text-light-blue q-mx-sm"
            v-model="localEx.targetSets"
            :min="1"
            :max="10"
            size="50px"
            color="light-blue"
          />
        </div>
        <div>
          <span class="text-label">Target Reps</span>
          <q-knob
            show-value
            class="text-light-blue q-mx-sm"
            v-model="localEx.targetReps"
            :min="1"
            :max="10"
            size="50px"
            color="light-blue"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import ExerciseList from './ExerciseList.vue'
import { WorkoutExercise } from '@/model/workout.model'
import { defineComponent, PropType, ref } from '@vue/composition-api'

export default defineComponent({
  components: { ExerciseList },

  props: {
    exercise: {
      type: Object as PropType<WorkoutExercise>,
      required: true,
    }
  },
  setup(_props, _ctx) {
    const localEx = ref(_props.exercise)

    function confirm() {
      _ctx.emit('confirm', localEx.value)
    }

    function cancel() {
      _ctx.emit('cancel', localEx.value)
    }

    return { localEx, confirm, cancel }
  },
})
</script>


<style lang="scss" scoped>
</style>