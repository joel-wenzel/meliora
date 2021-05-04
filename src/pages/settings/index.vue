<template>
  <m-app-fullscreen icon="mdi-cog" title="Settings">
    <q-list>
      <app-settings></app-settings>
      <q-separator class="q-my-sm"></q-separator>
      <theme-settings></theme-settings>
      <q-separator class="q-my-sm"></q-separator>
      <reset-data></reset-data>
      <q-separator class="q-my-sm"></q-separator>
    </q-list>
  </m-app-fullscreen>
</template>

<script lang="ts">
import ThemeSettings from './components/ThemeSettings.vue'
import MAppFullscreen from '../../components/app-fullscreen/MAppFullscreen.vue'
import AppSettings from './components/AppSettings.vue'
import ResetData from './components/ResetData.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: { ResetData, AppSettings, MAppFullscreen, ThemeSettings },
  setup(_props, _ctx) {
    return {}
  },
})
</script>
