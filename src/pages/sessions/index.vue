<template>
  <q-page>
    <div
      class="col-6 q-pa-sm day-card"
      v-for="(session, index) of sessions"
      :key="index"
    >
      <session-card :session="session" @edit="onEdit(session)"></session-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import SessionCard from './components/SessionCard.vue'
import { computed, defineComponent } from '@vue/composition-api'
import { Session, SessionDisplay } from '@/model/session.model'

export default defineComponent({
  components: { SessionCard },
  setup(_props, _ctx) {
    const sessions = computed(() => {
      const sessions: Array<SessionDisplay> = []
      const last = _ctx.root.$store.getters['sessions/lastCompleted'] as Session
      const next = _ctx.root.$store.getters['sessions/nextPreview']
      if (last) {
        sessions.push({
          title: 'Last',
          id: last.id,
          workoutId: last.workoutId,
          workoutName: last.workoutName,
          date: last.date,
          sessionExercises: last.exercises.map((ex) => {
            return {
              sets: ex.sets || ex.targetSets,
              reps: ex.reps || ex.targetReps,
              weight: ex.weight,
              exerciseName: ex.exercise.name,
            }
          }),
        })
      }
      if (next) {
        sessions.push(next)
      }
      return sessions
    })

    async function onEdit(session: SessionDisplay) {
      let editId = session.id
      if (!editId) {
        const nextSession = await _ctx.root.$store.dispatch(
          'sessions/startSession'
        )
        editId = nextSession.id
      }

      _ctx.root.$router.push({ path: editId, append: true })
    }

    return { sessions, onEdit }
  },
})
</script>
<style scoped></style>
