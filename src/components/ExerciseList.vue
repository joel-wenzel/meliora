<template>
  <div>
    <q-select
      filled
      input-debounce="0"
      no-error-icon
      label="Select Exercise"
      :options="exerciseList"
      option-value="id"
      option-label="name"
      emit-value
      map-options
      ref="exerciseSelect"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template #no-option>
        <create-exercise-input
          @selected="onExerciseSelect"
        ></create-exercise-input>
      </template>
      <template #before-options>
        <create-exercise-input
          @selected="onExerciseSelect"
        ></create-exercise-input>
      </template>
    </q-select>
    <q-dialog v-model="needsStartingWeight">
      <q-card>
        <q-card-section>
          <div class="text-overline">{{ lastCreatedEx.name }}</div>
          <div class="text-h6">Starting Weight</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Choose a starting weight for {{ lastCreatedEx.name }} that you can
          comfortably complete the target sets/reps with.
        </q-card-section>
        <q-card-section>
          <q-input
            type="number"
            v-model="newExerciseWeight"
            label="Starting Weight"
            :suffix="$labels.uom"
          >
          </q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            color="primary"
            @click="updateStartingWeight"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
import CreateExerciseInput from './CreateExerciseInput.vue'
import { Exercise } from '@/model/workout.model'
import {
  computed,
  defineComponent,
  Ref,
  ref,
  SetupContext,
  watch,
} from '@vue/composition-api'
import { QSelect } from 'node_modules/quasar/dist/types'

export default defineComponent({
  components: { CreateExerciseInput },
  setup(_props, _ctx) {
    const exerciseSelect = ref<QSelect>()

    const exerciseList = computed(() => {
      return _ctx.root.$store.getters.exercises as Array<Exercise>
    })

    // really wouldn't think i would need to do this
    watch(exerciseList, () => {
      exerciseSelect.value?.refresh()
    })

    return {
      exerciseList,
      exerciseSelect,
      ...setupNewExercise(exerciseSelect, _ctx),
    }
  },
})

function setupNewExercise(exerciseSelect: Ref, ctx: SetupContext) {
  const needsStartingWeight = ref<boolean>(false)
  const newExerciseWeight = ref<number>(75)
  const lastCreatedEx = ref<Exercise>({
    id: '',
    name: '',
  })

  function onExerciseSelect({
    isNew,
    exercise,
  }: {
    isNew: boolean
    exercise: Exercise
  }) {
    if (isNew) {
      lastCreatedEx.value = exercise
    }
    ctx.emit('input', exercise.id)
    exerciseSelect.value.hidePopup()

    if (isNew) {
      needsStartingWeight.value = true
    }
  }

  async function updateStartingWeight() {
    await ctx.root.$store.dispatch('patchExercise', {
      id: lastCreatedEx.value?.id,
      lastWeightLifted: newExerciseWeight.value - 5,
    })
  }

  return {
    onExerciseSelect,
    needsStartingWeight,
    lastCreatedEx,
    newExerciseWeight,
    updateStartingWeight,
  }
}
</script>
