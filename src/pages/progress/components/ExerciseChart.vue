<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Line } from 'vue-chartjs'

export default defineComponent({
  extends: Line,
  // props: {
  //   chartdata: {
  //     type: Object,
  //     default: null,
  //   },
  //   options: {
  //     type: Object,
  //     default: null,
  //   },
  // },
  data: () => ({
    chartdata: {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#917522',
          data: [40, 20],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  mounted() {
    // @ts-ignore
    this.renderChart(this.chartdata, this.options)
  },
})
</script>
