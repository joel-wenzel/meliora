<template>
  <q-page :class="{ 'items-center': !hasDefs }" class="row justify-evenly">
    <q-list bordered class="rounded-borders" v-if="hasDefs" style="width: 100%">
      <q-item-label header>Workout Routine</q-item-label>

      <q-item
        clickable
        v-ripple
        v-for="workoutDef in workoutDefs"
        :key="workoutDef.id"
      >
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ workoutDef.name }}</q-item-label>
          <q-item-label caption lines="2">
            <span v-for="exercise in workoutDef.workout" :key="exercise.id"
              >{{ exercise.name }} {{ exercise.targetSets }} x
              {{ exercise.targetReps }}</span
            >
          </q-item-label>
        </q-item-section>

        <q-item-section side top> 1 min ago </q-item-section>
      </q-item>

      <q-separator inset="item" />
    </q-list>
    <div
      v-else
      style="display: grid; place-items: center; height: 100%; width: 100%"
    >
      <p class="text-h6">You have no workouts!</p>
      <p class="text-subtitle1">Create your first workout to get started</p>
      <q-btn color="primary" @click="addWorkoutDef">Create Workout</q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup(_props, _ctx) {
    const workoutDefs = computed(() => _ctx.root.$store.getters['routine/workoutDefs'])

    const hasDefs = computed(() => workoutDefs.value && workoutDefs.value.length > 0)

    function addWorkoutDef() {
      _ctx.root.$store.dispatch('routine/addWorkoutDef', {
        name: 'Day 1',
        workout: [
          {
            id: 'cdd',
            name: 'Squat',
            targetReps: 5,
            targetSets: 5
          }
        ]
      })
    }
    return { workoutDefs, addWorkoutDef, hasDefs }
  }
})
</script>

<style scoped>
</style>