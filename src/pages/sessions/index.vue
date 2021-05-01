<template>
  <q-page class="row justify-evenly">
    <q-list class="rounded-borders" style="width: 100%">
      <div
        class="col-6 q-pa-sm"
        v-for="(session, index) of sessions"
        :key="index"
      >
        <session-card
          :sessionId="session.id"
          @click="openSession(session.id)"
        ></session-card>
      </div>
    </q-list>
    <div class="column justify-end q-pa-md">
      <start-session-btn @start="startSession"></start-session-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import SessionCard from './components/SessionCard.vue'
import StartSessionBtn from './components/StartSessionBtn.vue'
import { computed, defineComponent } from '@vue/composition-api'
import { sessionDisplayCount } from 'src/model/app.constants'
import Session from 'src/store/sessions/session.orm'

export default defineComponent({
  components: { StartSessionBtn, SessionCard },
  setup(_props, _ctx) {
    const sessions = computed(() => {
      return Session.query().limit(sessionDisplayCount).orderBy('date').get()
    })

    const startSession = async (workoutId) => {
      const session = await Session.createNew(workoutId)
      openSession(session.id)
    }

    const openSession = (sessionId) => {
      _ctx.root.$router.push({ path: sessionId, append: true })
    }

    return { sessions, startSession, openSession }
  },
})
</script>
<style scoped></style>
