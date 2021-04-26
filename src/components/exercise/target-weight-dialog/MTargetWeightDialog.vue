<template>
  <q-card>
    <q-card-section>
      <div class="text-overline">{{ exercise.name }}</div>
      <div class="text-h6">Starting Weight</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      Choose a starting weight for {{ exercise.name }} that you can comfortably
      complete the target sets/reps with.
    </q-card-section>
    <q-card-section>
      <q-input
        type="number"
        v-model="targetWeight"
        label="Starting Weight"
        :suffix="$labels.uom"
      >
      </q-input>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="OK" color="primary" @click="onUpdate" v-close-popup />
    </q-card-actions>
  </q-card>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import Exercise from '../../../store/exercises/exercise.orm'
export default defineComponent({
  props: {
    data: {
      type: String,
      required: true,
    },
  },
  setup(_props, _ctx) {
    const exercise = computed(() => Exercise.find(_props.data))
    const targetWeight = ref(exercise.value?.targetWeight)

    function onUpdate() {
      Exercise.update({
        where: _props.data,
        data: {
          targetWeight: targetWeight.value,
        },
      })
    }

    return { exercise, targetWeight, onUpdate }
  },
})
</script>
