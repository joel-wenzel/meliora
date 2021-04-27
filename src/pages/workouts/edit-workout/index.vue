<template>
  <q-page>
    <q-card class="column full-height">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>
          {{ isNew ? 'Add' : 'Edit' }} Workout
        </q-toolbar-title>
        <q-space />
        <q-btn dense flat icon="mdi-close" @click="onCancel">
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
        <m-edit-workout-exercises
          :workoutId="workoutId"
        ></m-edit-workout-exercises>
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
  </q-page>
</template>

<script lang="ts">
import MEditWorkoutExercises from '../../../components/workout/edit-workout-exercises/MEditWorkoutExercises.vue'

import { computed, defineComponent, ref } from '@vue/composition-api'

import Workout from '../../../store/workouts/workout.orm'

export default defineComponent({
  components: { MEditWorkoutExercises },
  props: {
    isNew: {
      type: Boolean,
      required: false,
      default: false,
    },

    defaultName: {
      type: String,
      required: false,
      default: 'My Workout',
    },
  },
  setup(_props, _ctx) {
    const workoutId = _ctx.root.$route.params.id
    const workout = computed(() => Workout.find(workoutId))
    if (!workout.value) {
      _ctx.root.$router.push({ path: '/workouts', append: false })
    }

    const name = ref<string>(
      _props.isNew ? _props.defaultName : workout.value?.name
    )

    function onCancel() {
      // Workout.deleteRecursive(workoutId)
      _ctx.root.$router.back()
    }

    function done() {
      // if (_props.isNew) {
      //   _ctx.root.$store.dispatch('workouts/addWorkout', {
      //     name: name.value,
      //     woExercises: exercises.value,
      //   })
      // } else {
      //   _ctx.root.$store.dispatch('workouts/updateWorkout', {
      //     id: workoutId,
      //     name: name.value,
      //     woExercises: exercises.value,
      //   })
      // }
    }

    return { name, workoutId, done, onCancel }
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
