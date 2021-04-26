<template>
  <q-page class="full-height">
    <div class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> {{ session.workoutName }} </q-toolbar-title>
        <q-space />
        <q-btn dense flat icon="mdi-close" v-close-popup>
          <q-tooltip content-class="bg-white text-primary"></q-tooltip>
        </q-btn>
      </q-toolbar>
      <q-toolbar inset class="session-subbar"> {{ sessionDate }} </q-toolbar>
    </div>

    <q-card-section v-for="sessEx of session.exercises" :key="sessEx.id">
      <session-exercise :sessionExeId="sessEx.id"></session-exercise>
    </q-card-section>
    <q-card-actions class="q-mt-auto">
      <q-btn color="primary" class="full-width">Finish</q-btn>
    </q-card-actions>
  </q-page>
</template>

<script lang="ts">
import SessionExercise from '../components/SessionExercise.vue'
import { computed, defineComponent } from '@vue/composition-api'
import moment from 'moment'

export default defineComponent({
  components: { SessionExercise },
  setup(_props, _ctx) {
    const session = computed(() => {
      return _ctx.root.$store.getters['sessions/sessions'].find(
        (sess) => sess.id === _ctx.root.$route.params.id
      )
    })
    console.log(session)
    session.value.exercises.forEach((exer) => {
      exer.sets = exer.targetSets
    })

    const sessionDate = computed(() => {
      const date = session.value.date || moment()
      return date.format('dddd, MMMM DD')
    })

    return { session, sessionDate }
  },
})
</script>

<style lang="scss" scoped>
.session-subbar {
  min-height: 36px;
}
</style>
