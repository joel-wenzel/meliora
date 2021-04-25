<template>
  <q-page>
    <div
      class="col-6 q-pa-sm day-card"
      v-for="session of sessions"
      :key="session.id"
    >
      <session-card :session="session" @edit="onEdit(session)"></session-card>
    </div>
    <q-dialog
      v-model="isEditing"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <edit-session></edit-session>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import EditSession from './components/EditSession.vue'
import SessionCard from './components/SessionCard.vue'
import { computed, defineComponent, provide, ref } from '@vue/composition-api'
import { Session } from '@/model/session.model'

export default defineComponent({
  components: { SessionCard, EditSession },
  setup(_props, _ctx) {
    const activeSession = ref<Session>()
    provide('activeSession', activeSession)

    const sessions = computed(() => {
      const sessions: Array<Session> = []
      const last = _ctx.root.$store.getters['sessions/last']
      const next = _ctx.root.$store.getters['sessions/next']
      if (last) {
        sessions.push(last)
      }
      if (next) {
        sessions.push(next)
      }
      return sessions
    })

    const isEditing = ref<boolean>(false)
    function onEdit(session) {
      activeSession.value = session
      isEditing.value = true
    }

    return { sessions, isEditing, onEdit }
  },
})
</script>
<style scoped></style>
