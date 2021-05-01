<template>
  <q-card @click="$emit('click')">
    <q-card-section>
      <div class="text-h6 capitalize">{{ session.workout.name }}</div>
      <q-item-label caption lines="1">
        {{ sessionDate }}
      </q-item-label>
    </q-card-section>
    <q-badge
      class="m-workout-status capitalize"
      rounded
      :color="session.completed ? 'positive' : 'accent'"
    >
      {{ session.completed ? 'complete' : 'in progress' }}
    </q-badge>
    <q-card-section class="q-pt-none">
      <q-list>
        <q-item
          v-for="ex in session.sessionExercises"
          :key="ex.id"
          dense
          class="q-pa-none"
        >
          <q-item-section>
            {{ ex.workoutExercise.exercise.name }}
          </q-item-section>
          <q-item-section>
            {{ ex.sets }} x
            {{ ex.reps }}
          </q-item-section>
          <q-item-section>{{ ex.weight }} {{ $labels.uom }}</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import moment from 'moment'
import Session from 'src/store/sessions/session.orm'

export default defineComponent({
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

    const sessionDate = moment(session.date).format('dddd, MMMM DD')
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
