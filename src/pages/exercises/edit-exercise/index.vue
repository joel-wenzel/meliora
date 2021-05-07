<template>
  <m-app-fullscreen contentClass="q-px-md q-py-sm" v-if="exercise">
    <template #toolbar>
      <q-toolbar-title shrink class="row items-center">
        <q-btn icon="mdi-arrow-left" round flat @click="onBack"></q-btn>

        <span>Edit Exercise</span>
      </q-toolbar-title>
      <q-space />
      <q-btn dense flat icon="mdi-close" @click="onClose"> </q-btn>
    </template>
    <q-item>
      <q-item-section>
        <q-item-label class="text-h6 row items-center">
          <span class="q-mr-sm">{{ exercise.name }}</span>
          <q-popup-edit :value="exercise.name">
            <q-input
              dense
              filled
              v-model="exercise.name"
              @change="updateExercise"
              autofocus
            ></q-input>
          </q-popup-edit>
          <q-icon color="primary" name="mdi-pencil" />
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator></q-separator>
    <q-list>
      <q-item>
        <q-item-section>
          <q-input
            label="Notes"
            v-model="exercise.notes"
            @change="updateExercise"
            outlined
            type="textarea"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            :label="`Increment (${$labels.uom})`"
            v-model="exercise.increment"
            type="number"
            @change="updateExercise"
            hint="How much we increment the weight between workouts"
            :suffix="$labels.uom"
          ></q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            :label="`Current Weight (${$labels.uom})`"
            v-model="exercise.targetWeight"
            type="number"
            @change="updateExercise"
            hint="Your current weight for this exercise"
            :suffix="$labels.uom"
          ></q-input>
        </q-item-section>
      </q-item>
    </q-list>
  </m-app-fullscreen>
</template>
<script lang="ts">
import MAppFullscreen from '../../../components/app-fullscreen/MAppFullscreen.vue'
import { computed, defineComponent, ref, watch } from '@vue/composition-api'
import Exercise from 'src/store/exercises/exercise.orm'

export default defineComponent({
  components: { MAppFullscreen },
  setup(_props, _ctx) {
    const exerciseId = computed(() => _ctx.root.$route.params.id)

    const exercise = ref<Exercise>()
    watch(
      exerciseId,
      (newId) => {
        exercise.value = Exercise.find(newId) as Exercise
      },
      { immediate: true }
    )

    function updateExercise() {
      if (!exercise.value) {
        return
      }
      exercise.value?.$update({
        name: exercise.value.name,
        notes: exercise.value.notes,
        targetWeight: exercise.value.targetWeight,
        increment: exercise.value.increment,
      })
    }

    function onBack() {
      _ctx.root.$router.back()
    }

    function onClose() {
      _ctx.root.$router.back()
      _ctx.root.$router.back()
    }
    return { onBack, onClose, exercise, updateExercise }
  },
})
</script>
