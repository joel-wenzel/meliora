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
                    v-for="exercise in workout.exercises"
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
    <q-dialog
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
    </q-dialog>
    <q-dialog
      v-model="isEditing"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <edit-workout :isNew="false" :workout="workoutEdit"></edit-workout>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import EditWorkout from './components/EditWorkout.vue'
import { computed, defineComponent, ref } from '@vue/composition-api'
import { Workout } from '@/model/workout.model'

export default defineComponent({
  components: { EditWorkout },
  setup(_props, _ctx) {
    const workouts = computed(
      () => _ctx.root.$store.getters['workouts/workouts']
    )

    const newDefaultWorkoutName = computed(() => {
      const index = (workouts.value.length as number) + 1
      return `Workout ${index}`
    })

    const hasDefs = computed(() => workouts.value && workouts.value.length > 0)

    const isCreating = ref<boolean>(false)
    const isEditing = ref<boolean>(false)
    const workoutEdit = ref<Workout>()

    function createWorkout() {
      isCreating.value = true
    }

    function editWorkout(workout: Workout) {
      isEditing.value = true
      workoutEdit.value = workout
    }

    async function deleteWorkout(id: string) {
      await _ctx.root.$store.dispatch('workouts/deleteWorkout', id)
    }

    return {
      workouts,
      isCreating,
      isEditing,
      createWorkout,
      editWorkout,
      deleteWorkout,
      workoutEdit,
      hasDefs,
      newDefaultWorkoutName,
    }
  },
})
</script>

<style scoped></style>
