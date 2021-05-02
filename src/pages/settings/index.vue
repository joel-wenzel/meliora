<template>
  <q-page>
    <q-card class="column full-height">
      <q-toolbar class="bg-secondary text-white">
        <q-toolbar-title> Settings </q-toolbar-title>
        <q-space />
        <q-btn dense flat icon="mdi-close" @click="onClose">
          <q-tooltip content-class="bg-white text-primary"></q-tooltip>
        </q-btn>
      </q-toolbar>

      <q-card-section class="q-pa-sm">
        <q-list>
          <app-settings></app-settings>
          <q-separator class="q-my-sm"></q-separator>
          <reset-data></reset-data>
          <q-separator class="q-my-sm"></q-separator>
        </q-list>
      </q-card-section>

      <q-card-actions class="q-mt-auto"> </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import AppSettings from './components/AppSettings.vue'
import ResetData from './components/ResetData.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: { ResetData, AppSettings },
  setup(_props, _ctx) {
    function onClose() {
      _ctx.root.$router.back()
    }
    return { onClose }
  },
})
</script>
