<template>
  <m-app-fullscreen
    :title="`${isNew ? 'Add' : 'Edit'} Workout`"
    icon="mdi-pencil"
    @close="onClose"
  >
    <q-item>
      <q-item-section>
        <q-item-label class="text-h6 row items-center">
          <span class="q-mr-sm">{{ name }}</span>
          <q-popup-edit v-model="name">
            <q-input
              dense
              filled
              v-model="name"
              autofocus
              v-focus-select
            ></q-input>
          </q-popup-edit>
          <q-icon color="primary" name="mdi-pencil" />
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator></q-separator>
    <edit-workout-exercises :workoutId="workoutId"></edit-workout-exercises>
  </m-app-fullscreen>
</template>

<script lang="ts">
import MAppFullscreen from '../../../components/app-fullscreen/MAppFullscreen.vue'
import EditWorkoutExercises from './components/EditWorkoutExercises.vue'
import { computed, defineComponent, ref } from '@vue/composition-api'
import Workout from 'src/store/workouts/workout.orm'

export default defineComponent({
  components: { EditWorkoutExercises, MAppFullscreen },
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
    const workout = computed(() =>
      Workout.query().with('workoutExercises').find(workoutId)
    )

    //invalid id, send back to /workouts
    if (!workout.value) {
      _ctx.root.$router.push({ path: '/workouts', append: false })
    }

    const name = ref<string>(
      _props.isNew ? _props.defaultName : workout.value?.name
    )

    function onClose() {
      if (workout.value?.workoutExercises.length == 0) {
        Workout.deleteRecursive(workoutId)
      }
    }

    return { name, workoutId, onClose }
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
