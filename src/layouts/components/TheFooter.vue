<template>
  <q-footer class="m-primary-container">
    <q-tabs dense no-caps class="shadow-2" :content-class="textColor">
      <q-route-tab
        name="sessions"
        icon="mdi-home"
        to="/sessions"
        label="sessions"
        exact
      />
      <!-- <q-route-tab
          name="history"
          icon="mdi-history"
          to="/history"
          label="history"
          exact
        /> -->
      <q-route-tab
        name="progress"
        icon="mdi-chart-timeline-variant"
        to="/progress"
        label="progress"
        exact
      />
      <q-route-tab
        name="workouts"
        icon="mdi-dumbbell"
        to="/workouts"
        label="workouts"
        exact
      />
    </q-tabs>
  </q-footer>
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup(_props, _ctx) {
    const textColor = computed(() =>
      _ctx.root.$q.dark.isActive ? 'text-primary-light' : ''
    )
    return { textColor }
  },
})
</script>
