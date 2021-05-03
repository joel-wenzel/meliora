<template>
  <m-app-fullscreen icon="mdi-cog" title="Settings">
    <q-list>
      <app-settings></app-settings>
      <q-separator class="q-my-sm"></q-separator>
      <reset-data></reset-data>
      <q-separator class="q-my-sm"></q-separator>
    </q-list>
  </m-app-fullscreen>
</template>

<script lang="ts">
import MAppFullscreen from '../../components/app-fullscreen/MAppFullscreen.vue'
import AppSettings from './components/AppSettings.vue'
import ResetData from './components/ResetData.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: { ResetData, AppSettings, MAppFullscreen },
  setup(_props, _ctx) {
    return {}
  },
})
</script>
