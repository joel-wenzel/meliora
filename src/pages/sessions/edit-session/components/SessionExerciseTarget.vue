:
<template>
  <div class="row items-center" @click="editTarget">
    <span class="link q-mr-xs">{{ target }}</span>
    <q-icon color="secondary" name="mdi-pencil" size="xs"></q-icon>
    <q-dialog v-model="isEditing">
      <q-card v-if="snapshot">
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
            @click="updateTarget"
            v-close-popup
            >Update</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/composition-api'
import SessionExercise from 'src/store/sessions/session-exercise.orm'

export default defineComponent({
  props: {
    sessionExerciseId: {
      type: String,
      required: true,
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
    return { snapshot, target, editTarget, isEditing, updateTarget }
  },
})
</script>
