<template>
  <fragment>
    <q-item-label header>Clear Data</q-item-label>
    <q-item class="q-mb-sm">
      <q-item-section avatar>
        <q-radio v-model="dataToReset" val="all" color="accent" />
      </q-item-section>
      <q-item-section @click="dataToReset = 'all'">
        <q-item-label>All Data</q-item-label>
        <q-item-label caption lines="2"
          >Clears all sessions, workouts and exercise data</q-item-label
        >
      </q-item-section>
    </q-item>
    <q-item class="q-mb-sm">
      <q-item-section avatar>
        <q-radio v-model="dataToReset" val="session" color="accent" />
      </q-item-section>
      <q-item-section @click="dataToReset = 'session'">
        <q-item-label>Sessions Only</q-item-label>
        <q-item-label caption lines="2"
          >Keeps your workouts and exercises but resets sessions</q-item-label
        >
      </q-item-section>
    </q-item>
    <q-btn class="full-width" color="secondary" unelevated @click="onClearData"
      >Clear Data</q-btn
    >
  </fragment>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup(_props, _ctx) {
    const dataToReset = ref<string>('session')

    function onClearData() {
      _ctx.root.$store.dispatch('showDialog', {
        comp: 'MConfirmDialog',
        data: {
          title: `Clear ${dataToReset.value} data`,
          message: 'This cannot be undone. Are you sure you wish to continue?',
          callback: onClearConfirm,
          callbackData: dataToReset.value,
        },
      })
    }

    function onClearConfirm(data) {
      _ctx.root.$store.dispatch('resetData', data)
    }
    return { dataToReset, onClearData }
  },
})
</script>
