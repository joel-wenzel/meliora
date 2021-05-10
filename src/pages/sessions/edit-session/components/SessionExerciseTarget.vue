:
<template>
  <div>
    <div
      class="row items-center"
      @click="editTarget"
      v-if="state === 'PENDING'"
    >
      <q-icon color="accent" name="mdi-bullseye" size="xs"></q-icon>
      <span class="link q-mr-xs">{{ target }}</span>

      <q-dialog v-model="isEditing" full-width>
        <q-card v-if="snapshot">
          <q-form @submit="updateTarget">
            <q-toolbar>
              <q-toolbar-title
                >Edit
                {{ sessionExercise.exercise.name }} Target</q-toolbar-title
              >
              <q-spacer></q-spacer>
              <q-btn flat round icon="mdi-close"></q-btn>
            </q-toolbar>

            <q-card-section>
              <q-input label="Sets" v-model="snapshot.targetSets" type="number">
              </q-input>
              <q-input label="Reps" v-model="snapshot.targetReps" type="number">
              </q-input>
              <q-input
                label="Weight"
                v-model="snapshot.weight"
                :suffix="$labels.uom"
                type="number"
              >
              </q-input>
            </q-card-section>
            <q-card-actions>
              <q-btn
                class="full-width"
                color="primary"
                type="submit"
                v-close-popup
                >Update</q-btn
              >
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>
    </div>

    <transition enter-active-class="animated slideInRight">
      <div v-if="state === 'COMPLETE'">
        <q-badge color="positive" class="row items-center text-body2">
          <q-icon name="mdi-check" size="1.5em" class="q-mr-sm"></q-icon>
          <span class="q-mr-xs"
            >{{ sessionExercise.weight }}{{ $labels.uom }}!</span
          >
        </q-badge>
      </div>

      <div v-if="state === 'FAILED'">
        <q-badge color="negative" class="row items-center text-body2">
          <q-icon name="mdi-close" size="1.5em" class="q-mr-sm"></q-icon>
          <span class="q-mr-xs"
            >{{ sessionExercise.weight }}{{ $labels.uom }}</span
          >
        </q-badge>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@vue/composition-api'
import SessionExercise from 'src/store/sessions/session-exercise.orm'

export default defineComponent({
  props: {
    sessionExerciseId: {
      type: String,
      required: true,
    },
    state: {
      type: String as PropType<'COMPLETE' | 'FAILED' | 'PENDING'>,
      required: false,
      default: 'PENDING',
    },
  },
  setup(_props, _ctx) {
    const isEditing = ref<boolean>(false)

    const snapshot = ref<SessionExercise>()

    const sessionExercise = computed(
      () =>
        SessionExercise.query()
          .withAllRecursive()
          .find(_props.sessionExerciseId) as SessionExercise
    )

    const target = computed(() => {
      const sessEx = sessionExercise.value
      return `${sessEx.targetSets}x${sessEx.targetReps} at ${Math.round(
        sessEx.weight
      )} lbs`
    })

    function editTarget() {
      snapshot.value = {
        ...sessionExercise.value,
      } as SessionExercise
      isEditing.value = true
    }

    function updateTarget() {
      if (!snapshot.value) {
        return
      }
      sessionExercise.value.$update({
        weight: snapshot.value.weight,
        targetSets: snapshot.value.targetSets,
        targetReps: snapshot.value.targetReps,
      })
    }
    return {
      snapshot,
      target,
      editTarget,
      isEditing,
      updateTarget,
      sessionExercise,
    }
  },
})
</script>
