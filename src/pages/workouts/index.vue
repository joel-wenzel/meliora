<template>
  <q-page :class="{ 'items-center': !hasDefs }" class="row justify-evenly">
    <template v-if="hasDefs">
      <q-list class="rounded-borders" style="width: 100%">
        <q-item-label header>Workout Routine</q-item-label>
        <div v-for="workout in workouts" :key="workout.id">
          <q-slide-item
            @right="deleteWorkout(workout.id)"
            right-color="negative"
          >
            <template v-slot:right>
              <div class="row items-center">
                <span class="text-body1 q-mr-md">Delete Workout</span>
                <q-icon name="mdi-delete" />
              </div>
            </template>
            <q-item clickable v-ripple :to="{ path: workout.id, append: true }">
              <q-item-section avatar>
                <q-icon name="mdi-dumbbell" color="accent" size="md"></q-icon>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-body1" lines="1">{{
                  workout.name
                }}</q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label caption lines="3">
                  <p
                    v-for="woExercise in workout.workoutExercises"
                    :key="woExercise.id"
                    class="q-ma-none"
                  >
                    <span v-if="woExercise.exercise">
                      {{ woExercise.targetSets }} x
                      {{ woExercise.targetReps }} -
                      {{ woExercise.exercise.name }}
                    </span>
                  </p>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-slide-item>
          <q-separator inset="item" />
        </div>
      </q-list>
      <div class="column justify-end q-pa-md">
        <q-btn
          color="primary-dark"
          label="Create Workout"
          icon="mdi-dumbbell"
          @click="createWorkout"
        >
        </q-btn>
      </div>
    </template>
    <div v-else class="grid-center">
      <p class="text-h6">You have no workouts!</p>
      <p class="text-subtitle1">Create your first workout to get started</p>
      <q-btn color="primary" @click="createWorkout">Create Workout</q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import Workout from '../../store/workouts/workout.orm'

export default defineComponent({
  components: {},
  setup(_props, _ctx) {
    const workouts = computed(() =>
      Workout.query()
        .whereHas('workoutExercises', (query) => {
          query.exists()
        })
        .withAllRecursive()
        .all()
    )

    const hasDefs = computed(() => workouts.value.length > 0)

    async function createWorkout() {
      const workout = await Workout.createNew()
      _ctx.root.$router.push({
        path: workout.id,
        append: true,
      })
    }

    async function deleteWorkout(id: string) {
      await Workout.delete(id)
    }

    return {
      workouts,
      createWorkout,
      deleteWorkout,
      hasDefs,
    }
  },
})
</script>

<style scoped></style>
