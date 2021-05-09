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

      <edit-workout-exercise
        v-for="(exercise, index) in workoutExercises"
        :key="index"
        :workoutExerciseId="exercise.id"
      ></edit-workout-exercise>
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
import EditWorkoutExercise from './EditWorkoutExercise.vue'
import { computed, defineComponent } from '@vue/composition-api'
import WorkoutExercise from 'src/store/workouts/workout-exercises.orm'

export default defineComponent({
  components: { EditWorkoutExercise },
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
