<template>
  <q-card @click="$emit('click')">
    <q-card-section>
      <div class="text-h6 capitalize">{{ session.workout.name }}</div>
      <q-item-label caption lines="1">
        {{ sessionDate }}
      </q-item-label>
    </q-card-section>
    <q-badge
      class="m-workout-status capitalize text-body2"
      rounded
      :color="session.completed ? 'positive' : 'accent'"
    >
      {{ session.completed ? 'complete' : 'in progress' }}
    </q-badge>
    <q-card-section class="q-pt-none">
      <q-list>
        <session-exercise-result
          v-for="ex in session.sessionExercises"
          :key="ex.id"
          :sessionExerciseId="ex.id"
        ></session-exercise-result>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import SessionExerciseResult from './SessionExerciseResult.vue'
import { defineComponent } from '@vue/composition-api'
import moment from 'moment'
import Session from 'src/store/sessions/session.orm'

export default defineComponent({
  components: { SessionExerciseResult },
  props: {
    sessionId: {
      type: String,
      required: true,
    },
  },
  setup(_props, _ctx) {
    const session: Session = Session.query()
      .withAllRecursive()
      .find(_props.sessionId) as Session

    const sessionDate = moment(session.date).fromNow()
    return { session, sessionDate }
  },
})
</script>

<style lang="scss" scoped>
.day-card {
  height: fit-content;
}

.q-item--dense {
  min-height: 22px;
}

.m-workout-status {
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 3px !important;
}
</style>
