<template>
  <fragment>
    <q-item-label header>Theme</q-item-label>
    <q-item class="q-mb-sm">
      <q-item-section avatar>
        <q-toggle v-model="dark" color="accent" />
      </q-item-section>
      <q-item-section @click="dark = !dark">
        <q-item-label>Toggle Dark Mode</q-item-label>
      </q-item-section>
    </q-item>
  </fragment>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'

export default defineComponent({
  setup(_props, _ctx) {
    const dark = ref<boolean>(_ctx.root.$store.state.app.settings.darkMode)

    watch(dark, (isDark) => {
      _ctx.root.$store.dispatch('updateSettings', {
        darkMode: isDark,
      })
    })
    return { dark }
  },
})
</script>
