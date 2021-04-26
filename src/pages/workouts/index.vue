<template>
  <q-page :class="{ 'items-center': !hasDefs }" class="row justify-evenly">
    <template v-if="hasDefs">
      <q-list class="rounded-borders" style="width: 100%">
        <q-item-label header>Workout Routine</q-item-label>
        <div v-for="workout in workouts" :key="workout.id">
          <q-slide-item @right="deleteWorkout(workout.id)" right-color="red">
            <template v-slot:right>
              <div class="row items-center">
                <span class="text-body1 q-mr-md">Delete Workout</span>
                <q-icon name="mdi-delete" />
              </div>
            </template>
            <q-item clickable v-ripple @click="editWorkout(workout)">
              <q-item-section avatar>
                <q-icon name="mdi-dumbbell" size="md"></q-icon>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-body1" lines="1">{{
                  workout.name
                }}</q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label caption lines="3">
                  <p
                    v-for="exercise in workout.workoutExercises"
                    :key="exercise.id"
                    class="q-ma-none"
                  >
                    {{ exercise.targetSets }} x {{ exercise.targetReps }} -
                    {{ exercise.name }}
                  </p>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-slide-item>
          <q-separator inset="item" />
        </div>
      </q-list>
      <div class="column justify-end q-pa-md">
        <q-btn color="primary" @click="createWorkout">Create Workout</q-btn>
      </div>
    </template>
    <div v-else class="grid-center">
      <p class="text-h6">You have no workouts!</p>
      <p class="text-subtitle1">Create your first workout to get started</p>
      <q-btn color="primary" @click="createWorkout">Create Workout</q-btn>
    </div>
    <!-- <q-dialog
      v-model="isCreating"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <edit-workout
        :isNew="true"
        :defaultName="newDefaultWorkoutName"
      ></edit-workout>
    </q-dialog> -->
    <!-- <q-dialog
      v-model="isEditing"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      
    </q-dialog> -->
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import Workout from '../../store/workouts/workout.orm'

export default defineComponent({
  components: {},
  setup(_props, _ctx) {
    const workouts = computed(() =>
      Workout.query().where('isPending', false).all()
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
