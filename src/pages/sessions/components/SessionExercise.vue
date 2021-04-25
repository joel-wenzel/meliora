<template>
  <q-item>
    <q-item-section>
      <q-item-label class="row justify-between">
        <span class="text-body1">{{ exercise.exercise.name }}</span>
        <span class="text-caption">{{ exercise.weight }} lbs</span>
      </q-item-label>
      <q-item-label class="row">
        <set-tracker
          class="q-mr-sm"
          v-for="(set, index) in sets"
          :key="index"
          v-model="set.count"
          :target="set.target"
        ></set-tracker>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import SetTracker from '../../../components/SetTracker.vue'
import { Session, SessionExercise } from '@/model/session.model'
import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  ref,
  Ref,
} from '@vue/composition-api'

export default defineComponent({
  props: {
    sessionExeId: {
      type: String,
      required: true,
    },
  },
  components: { SetTracker },
  setup(_props, _ctx) {
    const activeSession = inject('activeSession') as Ref<Session>
    const exercise = computed(() => {
      return activeSession.value.exercises.find(
        (ex) => ex.id === _props.sessionExeId
      )
    }) as ComputedRef<SessionExercise>

    const defaultSets: Array<any> = []
    for (let i = 0; i < exercise.value.targetSets; i++) {
      defaultSets.push({
        count: 1,
        target: exercise.value.targetReps,
      })
    }

    const sets = ref(defaultSets)

    return { exercise, sets }
  },
})
</script>

<style scoped></style>
