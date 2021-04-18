<template>
  <q-card>
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title> Add Workout </q-toolbar-title>
      <q-space />
      <q-btn dense flat icon="mdi-close" v-close-popup>
        <q-tooltip content-class="bg-white text-primary"></q-tooltip>
      </q-btn>
    </q-toolbar>

    <q-card-section>
      <q-form @submit="addWorkout" class="add-workout-form">
        <q-input
          filled
          no-error-icon
          v-model="name"
          label="Workout Nickname"
          hint="Used to help you remember the exercises in the workout"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please enter a nickname',
          ]"
        />
        <q-list bordered separator>
          <q-slide-item
            v-for="(exercise, index) of workoutExercises"
            :key="index"
            class="column q-pa-sm add-exercise-form"
          >
          </q-slide-item>
        </q-list>
        <q-btn
          icon="mdi-plus"
          label="Add Exercise"
          unelevated
          color="secondary"
          class="full-width"
          @click="addNewExercise"
        ></q-btn>
        <div>
          <q-btn label="Done" type="submit" color="primary" />
          <q-btn
            label="Clear"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
        <q-dialog v-model="addingExercise">
          <edit-workout-exercise
            :exercise="{ id: '', targetReps: 5, targetSets: 5 }"
          ></edit-workout-exercise>
        </q-dialog>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import EditWorkoutExercise from './EditWorkoutExercise.vue'
import { WorkoutExercise } from '@/model/workout.model'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  components: { EditWorkoutExercise },
  setup(_props, _ctx) {

    const addingExercise = ref<boolean>(false)

    const name = ref<string>()

    const workoutExercises = ref<Array<Partial<WorkoutExercise>>>([])

    function addNewExercise() {
      addingExercise.value = true
    }

    function addWorkout() {
      _ctx.root.$store.dispatch('routine/addWorkout', {
        name: name.value,
        workout: workoutExercises.value
      })
    }

    return { name, workoutExercises, addWorkout, addingExercise, addNewExercise }
  },
})
</script>
<style scoped lang="scss">
.add-workout-form {
  & > :not(:last-child) {
    margin-bottom: 16px;
  }
}

.add-exercise-form {
  & > :not(:last-child) {
    margin-bottom: 8px;
  }
}
</style>