<template>
  <m-app-fullscreen
    icon="mdi-weight-lifter"
    title="Exercises"
    contentClass="q-pa-md"
  >
    <q-item dense id="exercise-header">
      <q-item-section avatar> </q-item-section>
      <q-item-section>
        <q-item-label class="text-body1 text-grey-7"> Exercise </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label class="text-body1 text-grey-7">Next Weight</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator></q-separator>
    <q-list separator>
      <q-item v-for="exercise in exercises" :key="exercise.id">
        <q-item-section avatar>
          <q-icon name="mdi-weight-lifter"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ exercise.name }}</q-item-label>
          <q-item-label caption
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
            amet, cum magni
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label
            >{{ Math.round(exercise.targetWeight) }}
            {{ $labels.uom }}</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>
  </m-app-fullscreen>
</template>

<script lang="ts">
import MAppFullscreen from '../../components/app-fullscreen/MAppFullscreen.vue'
import { computed, defineComponent } from '@vue/composition-api'
import Exercise from 'src/store/exercises/exercise.orm'

export default defineComponent({
  components: { MAppFullscreen },
  setup() {
    const exercises = computed(() => Exercise.all())

    return { exercises }
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
