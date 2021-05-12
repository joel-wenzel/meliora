<template>
  <m-app-fullscreen icon="mdi-weight-lifter" title="Exercises">
    <q-list>
      <q-item-label header>My Exercises</q-item-label>
      <div v-for="exercise in exercises" :key="exercise.id">
        <q-slide-item
          @right="deleteExercise($event, exercise.id)"
          right-color="negative"
        >
          <template v-slot:right>
            <div class="row items-center">
              <span class="text-body1 q-mr-md">Delete Exercise</span>
              <q-icon name="mdi-delete" />
            </div>
          </template>
          <q-item clickable v-ripple :to="{ path: exercise.id, append: true }">
            <q-item-section avatar>
              <q-icon name="mdi-weight-lifter"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ exercise.name }}</q-item-label>
              <q-item-label caption>{{ exercise.notes }} </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label
                >{{ Math.round(exercise.targetWeight) }}
                {{ $labels.uom }}</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-slide-item>
        <q-separator></q-separator>
      </div>
    </q-list>
    <div class="column col-grow justify-end q-pa-md">
      <q-btn
        color="primary-dark"
        label="Add Exercise"
        icon="mdi-weight-lifter"
        @click="addExercise"
      >
      </q-btn>
    </div>
  </m-app-fullscreen>
</template>

<script lang="ts">
import MAppFullscreen from '../../components/app-fullscreen/MAppFullscreen.vue'
import { computed, defineComponent } from '@vue/composition-api'
import Exercise from 'src/store/exercises/exercise.orm'

export default defineComponent({
  components: { MAppFullscreen },
  setup(_props, _ctx) {
    const exercises = computed(() => Exercise.all())

    function deleteExercise({ reset }, id: string) {
      if (!Exercise.deleteExercise(id)) {
        reset()
      }
    }

    async function addExercise() {
      const ex = await Exercise.createNew()
      _ctx.root.$router.push({ path: ex.id, append: true })
    }

    return { exercises, deleteExercise, addExercise }
  },
})
</script>
<style lang="scss" scoped>
#exercise-header {
  min-height: unset;
  height: 30px;
  padding-bottom: 8px;
}
</style>
