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
        <q-input
          v-model="newExerciseText"
          class="q-px-md"
          placeholder="Add Exercise"
          @keydown.enter="createExercise"
        >
          <template #append>
            <q-btn color="secondary" outline unelevated @click="createExercise"
              >Add</q-btn
            >
          </template>
        </q-input>
      </template>
      <template #before-options>
        <q-input
          v-model="newExerciseText"
          class="q-px-md"
          placeholder="Add Exercise"
          @keydown.enter="createExercise"
        >
          <template #append>
            <q-btn color="secondary" outline unelevated @click="createExercise"
              >Add</q-btn
            >
          </template>
        </q-input>
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
      ...setupNewExercise(exerciseList, exerciseSelect, _ctx),
    }
  },
})

function setupNewExercise(
  exerciseList: Ref,
  exerciseSelect: Ref,
  ctx: SetupContext
) {
  const newExerciseText = ref<string>('')
  const needsStartingWeight = ref<boolean>(false)
  const lastCreatedEx = ref<Exercise>({
    id: '',
    name: '',
  })
  const newExerciseWeight = ref<number>(75)

  async function createExercise() {
    if (newExerciseText.value.length > 0) {
      let isNewExercise = false
      let selected = exerciseList.value.find(
        (ex) => ex.name === newExerciseText.value
      )
      if (!selected) {
        isNewExercise = true
        selected = await ctx.root.$store.dispatch('addExercise', {
          name: newExerciseText.value,
          lastWeightLifted: newExerciseWeight.value - 5,
        })
        lastCreatedEx.value = selected
      }

      newExerciseText.value = ''
      ctx.emit('input', selected.id)
      exerciseSelect.value.hidePopup()

      if (isNewExercise) {
        needsStartingWeight.value = true
      }
    }
  }

  async function updateStartingWeight() {
    await ctx.root.$store.dispatch('patchExercise', {
      id: lastCreatedEx.value?.id,
      lastWeightLifted: newExerciseWeight.value - 5,
    })
  }

  return {
    createExercise,
    newExerciseText,
    needsStartingWeight,
    lastCreatedEx,
    newExerciseWeight,
    updateStartingWeight,
  }
}
</script>
