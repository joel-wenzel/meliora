<template>
  <div>
    <q-list>
      <q-item header dense>
        <q-item-section class="col-7">
          <q-item-label>Exercise</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Sets</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Reps</q-item-label>
        </q-item-section>
      </q-item>
      <m-edit-workout-exercise
        v-for="(exercise, index) in workoutExercises"
        :key="index"
        :workoutExerciseId="exercise.id"
      ></m-edit-workout-exercise>
    </q-list>
    <q-btn
      icon="mdi-plus"
      label="Add Exercise"
      unelevated
      outline
      color="secondary"
      class="full-width"
      @click="addWorkoutExercise"
    ></q-btn>
  </div>
</template>

<script lang="ts">
import MEditWorkoutExercise from '../edit-workout-exercise/MEditWorkoutExercise.vue'
import WorkoutExercise from '../../../store/workouts/workout-exercises.orm'
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: { MEditWorkoutExercise },
  props: {
    workoutId: {
      type: String,
      required: true,
    },
  },
  setup(_props) {
    const workoutExercises = computed(() =>
      WorkoutExercise.query().where('workoutId', _props.workoutId).all()
    )

    function addWorkoutExercise() {
      WorkoutExercise.createNew(_props.workoutId)
    }
    return { workoutExercises, addWorkoutExercise }
  },
})
</script>

<style scoped></style>
