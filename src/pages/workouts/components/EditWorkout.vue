<template>
  <q-card class="column">
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title> {{ isNew ? 'Add' : 'Edit' }} Workout </q-toolbar-title>
      <q-space />
      <q-btn dense flat icon="mdi-close" v-close-popup>
        <q-tooltip content-class="bg-white text-primary"></q-tooltip>
      </q-btn>
    </q-toolbar>

    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 row items-center">
            <span class="q-mr-sm">{{ name }}</span>
            <q-popup-edit v-model="name">
              <q-input dense filled v-model="name" autofocus></q-input>
            </q-popup-edit>
            <q-icon color="primary" name="mdi-pencil" />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator></q-separator>
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

        <q-item v-for="(exercise, index) in exercises" :key="index">
          <q-item-section class="col-7">
            <exercise-list v-model="exercise.exerciseId" dense></exercise-list>
          </q-item-section>

          <q-item-section>
            <q-input
              filled
              dense
              type="number"
              min="1"
              max="30"
              v-model="exercise.targetSets"
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
              v-model="exercise.targetReps"
              v-focus-select
            ></q-input>
          </q-item-section>
        </q-item>
      </q-list>
      <q-btn
        icon="mdi-plus"
        label="Add Exercise"
        unelevated
        outline
        color="secondary"
        class="full-width"
        @click="addExercise"
      ></q-btn>
    </q-card-section>

    <q-card-actions class="q-mt-auto">
      <q-btn
        icon="mdi-save"
        label="Done"
        unelevated
        color="primary"
        class="full-width"
        @click="done"
        v-close-popup
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import ExerciseList from './ExerciseList.vue'

import { Workout, WorkoutExercise } from '@/model/workout.model'
import { defineComponent, PropType, ref } from '@vue/composition-api'

export default defineComponent({
  components: { ExerciseList },
  props: {
    isNew: {
      type: Boolean,
      required: false,
      default: false,
    },
    workout: {
      type: Object as PropType<Workout>,
      required: false,
      default: null,
    },
    defaultName: {
      type: String,
      required: false,
      default: 'My Workout',
    },
  },
  setup(_props, _ctx) {
    const name = ref<string>(
      _props.isNew ? _props.defaultName : _props.workout.name
    )
    const exercises = ref<Array<WorkoutExercise>>(
      _props.isNew ? [] : _props.workout.exercises
    )

    function addExercise() {
      exercises.value.push({
        id: '',
        exerciseId: '',
        name: '',
        targetReps: 5,
        targetSets: 5,
      })
    }

    function done() {
      if (_props.isNew) {
        _ctx.root.$store.dispatch('workouts/addWorkout', {
          name: name.value,
          exercises: exercises.value,
        })
      } else {
        _ctx.root.$store.dispatch('workouts/updateWorkout', {
          id: _props.workout.id,
          name: name.value,
          exercises: exercises.value,
        })
      }
    }

    return { name, exercises, addExercise, done }
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
