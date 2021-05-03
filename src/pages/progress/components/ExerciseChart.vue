<template>
  <apexchart
    class="full-width q-pa-sm"
    :height="`${height}px`"
    type="line"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import SessionExercise from 'src/store/sessions/session-exercise.orm'
import moment from 'moment'
import Exercise from 'src/store/exercises/exercise.orm'
import { Dictionary } from 'src/model/app.types'

export default defineComponent({
  setup(_props, _ctx) {
    const height = computed(() => _ctx.root.$q.screen.height - 106 - 16)

    // TODO possibly move this to a cached getter if it doesnt load quick enough
    const sessionExercises = SessionExercise.query()
      .with('exercise')
      .orderBy('date', 'asc')
      .all()

    const sessionData = sessionExercises.reduce((acc, sEx) => {
      const date = moment(sEx.date).format('YYYY-MM-DD')
      if (!acc[date]) {
        acc[date] = {}
      }

      acc[date][sEx.exercise.name] = sEx.weight

      return acc
    }, {})

    const options = {
      chart: {
        id: 'progress-chart',
      },
      xaxis: {
        categories: Object.keys(sessionData),
      },
    }

    const exercises = Exercise.all()

    const series = exercises.map((ex) => {
      return {
        name: ex.name,
        data: Object.entries(sessionData).map(
          (entry) => (entry[1] as Dictionary)[ex.name]
        ),
      }
    })

    return { height, options, series }
  },
})
</script>
