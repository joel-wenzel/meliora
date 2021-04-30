<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 capitalize">{{ data.title }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ data.message }}
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        flat
        label="Confirm"
        color="primary"
        @click="data.callback(true)"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
