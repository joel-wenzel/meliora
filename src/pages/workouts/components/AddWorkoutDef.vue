<template>
  <q-card>
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title> Add Workout </q-toolbar-title>
      <q-space />
      <q-btn dense flat icon="mdi-close" v-close-popup>
        <q-tooltip content-class="bg-white text-primary"></q-tooltip>
      </q-btn>
    </q-toolbar>

    <q-card-section >
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          no-error-icon
          v-model="name"
          label="Workout Nickname *"
          hint="Used to help you remember the exercises in the workout"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please enter a nickname']"
        />

        <q-input
          filled
          type="number"
          no-error-icon
          v-model="age"
          label="Your age *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type your age',
            (val) => (val > 0 && val < 100) || 'Please type a real age',
          ]"
        />

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({

  setup(_props, _ctx) {
    function addDef() {
      _ctx.root.$store.dispatch('routine/addWorkoutDef', {
        name: 'Day 1',
        workout: [
          {
            id: 'cdd',
            name: 'Squat',
            targetReps: 5,
            targetSets: 5
          },
          {
            id: 'cdd3',
            name: 'Bench Press',
            targetReps: 5,
            targetSets: 5
          },
          {
            id: 'cdd1',
            name: 'Barbell Row',
            targetReps: 5,
            targetSets: 5
          }
        ]
      })
    }

    return { addDef }
  },
})
</script>
