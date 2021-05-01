<template>
  <q-page>
    <q-toolbar class="bg-primary text-white" elevated>
      <q-toolbar-title shrink> {{ title }}</q-toolbar-title>
      <q-space />
      <q-btn dense flat icon="mdi-close" @click="onClose">
        <q-tooltip content-class="bg-white text-primary"></q-tooltip>
      </q-btn>
    </q-toolbar>
    <q-toolbar
      inset
      class="bg-primary-light session-subbar row justify-between"
    >
      <span>{{ sessionDate }}</span>
      <q-btn unelevated icon="mdi-dots-vertical" padding="0"></q-btn>
    </q-toolbar>
    <q-list class="q-ma-xs">
      <div v-for="sEx in session.sessionExercises" :key="sEx.id">
        <session-exercise :sessionExerciseId="sEx.id"></session-exercise>
        <q-separator></q-separator>
      </div>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import SessionExercise from '../components/SessionExercise.vue'
import { computed, defineComponent } from '@vue/composition-api'
import Session from 'src/store/sessions/session.orm'
import moment from 'moment'

export default defineComponent({
  components: { SessionExercise },
  setup(_props, _ctx) {
    const session = computed(
      () =>
        Session.query()
          .with(['sessionExercises', 'workout'])
          .find(_ctx.root.$route.params.id) as Session
    )

    if (!session.value) {
      // TODO maybe have a 404 page instead
      _ctx.root.$router.push('/sessions')
    }

    const title = computed(() => `${session.value?.workout.name} Session`)
    const sessionDate = computed(() =>
      moment(session.value?.date).format(_ctx.root.$store.getters['dateFormat'])
    )

    function onClose() {
      _ctx.root.$router.back()
    }

    return { session, title, onClose, sessionDate }
  },
})
</script>

<style lang="scss" scoped>
.session-subbar {
  min-height: 36px;
}
</style>
