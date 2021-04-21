<template>
  <q-page>
    <div
      class="col-6 q-pa-sm day-card"
      v-for="session of sessions"
      :key="session.id"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6 capitalize">{{ session.title }}</div>
          <q-item-label caption lines="1">
            {{ session.date ? session.date.format('dddd, MMMM DD') : 'tbd' }}
          </q-item-label>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-list>
            <q-item
              v-for="ex in session.exercises"
              :key="ex.id"
              dense
              class="q-pa-none"
            >
              <q-item-section>
                {{ ex.exercise.name }}
              </q-item-section>
              <q-item-section> {{ ex.sets }} x {{ ex.reps }} </q-item-section>
              <q-item-section>{{ ex.weight }} lbs</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import useSessionManager from './session-manager'

export default defineComponent({
  setup(_props, _ctx) {
    const { nextSessions } = useSessionManager(_ctx.root.$store)
    // _ctx.root.$store.dispatch('sessions/addSession', {
    //   workoutId: 'eeb061d7-b55d-4cf2-ae2d-c00d3eb44ea8',
    //   workoutName: 'Day 1',
    //   bodyWeight: '142.6',
    //   exercises: [
    //     {
    //       exercise: {
    //         id: '1',
    //         name: 'Squat',
    //       },
    //       reps: 5,
    //       sets: 5,
    //       weight: 130,
    //     },
    //     {
    //       exercise: {
    //         id: '5b8983ac-819b-4d7e-b675-84dcdcf2ab46',
    //         name: 'Bench Press',
    //       },
    //       reps: 5,
    //       sets: 5,
    //       weight: 130,
    //     },
    //     {
    //       exercise: {
    //         id: 'e8d855ef-bada-4874-be7d-775fae5403c1',
    //         name: 'Barbell Row',
    //       },
    //       reps: 5,
    //       sets: 5,
    //       weight: 125,
    //     },
    //   ],
    // })

    const sessions = computed(() => {
      const last = _ctx.root.$store.getters['sessions/last']
      last.title = 'last'

      return [last, ...nextSessions.value]
    })
    return { sessions }
  },
})
</script>
<style scoped>
.day-card {
  height: fit-content;
}

.q-item--dense {
  min-height: 22px;
}
</style>
