<template>
  <q-item>
    <q-item-section class="col-7">
      <exercise-select
        v-model="workoutExercise.exerciseId"
        @input="updateExercise"
        dense
      ></exercise-select>
    </q-item-section>

    <q-item-section>
      <q-input
        filled
        dense
        type="number"
        min="1"
        max="30"
        v-model="workoutExercise.targetSets"
        @input="updateExercise"
        v-focus-select
      ></q-input>
    </q-item-section>
    <q-item-section>
      <q-input
        filled
        dense
        type="number"
        min="1"
        max="30"
        v-model="workoutExercise.targetReps"
        @input="updateExercise"
        v-focus-select
      ></q-input>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import ExerciseSelect from './ExerciseSelect.vue'
import { defineComponent, ref } from '@vue/composition-api'
import WorkoutExercise from 'src/store/workouts/workout-exercises.orm'

export default defineComponent({
  props: {
    workoutExerciseId: {
      type: String,
      required: true,
    },
  },
  components: { ExerciseSelect },
  setup(_props) {
    const workoutExercise = ref(
      WorkoutExercise.find(_props.workoutExerciseId) as WorkoutExercise
    )

    function updateExercise() {
      WorkoutExercise.update({
        where: workoutExercise.value.$id as string,
        data: workoutExercise.value,
      })
    }
    return { workoutExercise, updateExercise }
  },
})
</script>
