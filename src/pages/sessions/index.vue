<template>
  <q-page class="row justify-evenly">
    <q-list class="rounded-borders" style="width: 100%">
      <div
        class="col-6 q-pa-sm"
        v-for="(session, index) of sessions"
        :key="index"
      ></div>
    </q-list>
    <div class="column justify-end q-pa-md">
      <start-session-btn @start="startSession"></start-session-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import StartSessionBtn from './components/StartSessionBtn.vue'
import { computed, defineComponent } from '@vue/composition-api'
import { sessionDisplayCount } from 'src/model/app.constants'
import Session from 'src/store/sessions/session.orm'

export default defineComponent({
  components: { StartSessionBtn },
  setup(_props, _ctx) {
    const sessions = computed(() => {
      return Session.query().limit(sessionDisplayCount).orderBy('date').get()
    })

    const startSession = (workoutId) => {
      Session.createNew(workoutId)
    }

    return { sessions, startSession }
  },
})
</script>
<style scoped></style>
