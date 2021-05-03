<template>
  <q-page>
    <q-toolbar class="bg-primary-light text-white">
      <q-toolbar-title class="row items-center">
        <q-icon :name="icon" size="md" class="q-mr-sm"></q-icon>
        <span>{{ title }}</span>
      </q-toolbar-title>
      <q-space />
      <q-btn dense flat icon="mdi-close" @click="onClose"> </q-btn>
    </q-toolbar>
    <div :class="contentClass">
      <slot></slot>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    contentClass: {
      type: String,
      required: false,
      default: 'q-pa-sm',
    },
  },
  setup(_props, _ctx) {
    function onClose() {
      _ctx.emit('close')
      _ctx.root.$router.back()
    }
    return { onClose }
  },
})
</script>
