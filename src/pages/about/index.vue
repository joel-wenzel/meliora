<template>
  <m-app-fullscreen title="About" icon="mdi-information">
    <q-card flat bordered>
      <q-card-section class="column justify-center items-center q-pb-none">
        <q-icon name="mdi-webhook" size="6em" color="primary"></q-icon>
      </q-card-section>
      <q-card-section>
        <div class="text-overline">v1.0.0</div>
        <div class="text-h5 q-mt-none q-mb-xs">Meliora</div>
        <div class="text-caption text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </q-card-section>
    </q-card>
  </m-app-fullscreen>
</template>
<script lang="ts">
import MAppFullscreen from '../../components/app-fullscreen/MAppFullscreen.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: { MAppFullscreen },
  setup() {
    return {}
  },
})
</script>
