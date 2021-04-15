<template>
  <q-page :class="{ 'items-center': !hasDefs }" class="row justify-evenly">
    <template v-if="hasDefs">
      <q-list class="rounded-borders" style="width: 100%">
        <q-item-label header>Workout Routine</q-item-label>
        <div v-for="workoutDef in workoutDefs" :key="workoutDef.id">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{ workoutDef.name }}</q-item-label>
              <q-item-label caption lines="3">
                <p
                  v-for="exercise in workoutDef.workout"
                  :key="exercise.id"
                  class="q-ma-none"
                >
                  {{ exercise.name }} {{ exercise.targetSets }} x
                  {{ exercise.targetReps }}
                </p>
              </q-item-label>
            </q-item-section>

            <q-item-section side top> 1 min ago </q-item-section>
          </q-item>

          <q-separator inset="item" />
        </div>
      </q-list>
      <div class="column justify-end q-pa-md">
        <q-btn color="primary" @click="createWorkoutDef">Create Workout</q-btn>
      </div>
    </template>
    <div v-else class="grid-center">
      <p class="text-h6">You have no workouts!</p>
      <p class="text-subtitle1">Create your first workout to get started</p>
      <q-btn color="primary" @click="createWorkoutDef">Create Workout</q-btn>
    </div>
    <q-dialog
      v-model="isCreatingDef"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <add-workout-def></add-workout-def>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import AddWorkoutDef from './components/AddWorkoutDef.vue'
import { computed, defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  components: { AddWorkoutDef},
  setup(_props, _ctx) {
    const workoutDefs = computed(() => _ctx.root.$store.getters['routine/workoutDefs'])

    const hasDefs = computed(() => workoutDefs.value && workoutDefs.value.length > 0)

    const isCreatingDef = ref<boolean>(false)

    function createWorkoutDef() {
      isCreatingDef.value = true
    }
    return { workoutDefs, isCreatingDef, createWorkoutDef, hasDefs }
  }
})
</script>

<style scoped>
</style>