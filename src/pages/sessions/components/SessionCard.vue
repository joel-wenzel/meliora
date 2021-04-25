<template>
  <q-card @click="$emit('edit')">
    <q-card-section>
      <q-item-label overline lines="1">
        {{ session.workoutName }}
      </q-item-label>
      <div class="text-h6 capitalize">{{ title }}</div>
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
          <q-item-section>
            {{ ex.sets || ex.targetSets }} x
            {{ ex.reps || ex.targetReps }}
          </q-item-section>
          <q-item-section>{{ ex.weight }} lbs</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Session } from '@/model/session.model'
import { computed, defineComponent, PropType } from '@vue/composition-api'

export default defineComponent({
  props: {
    session: {
      type: Object as PropType<Session>,
      required: true,
    },
  },
  setup(_props, _ctx) {
    const title = computed(() => {
      return _props.session.completed ? 'last' : 'next'
    })
    return { title }
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
</style>
