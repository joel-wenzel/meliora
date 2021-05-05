<template>
  <q-page :class="pageClass">
    <q-toolbar class="bg-primary-light text-white">
      <slot name="toolbar" :title="title" :icon="icon">
        <q-toolbar-title class="row items-center">
          <q-icon :name="icon" size="md" class="q-mr-sm"></q-icon>
          <span>{{ title }}</span>
        </q-toolbar-title>
        <q-space />
        <q-btn dense flat icon="mdi-close" @click="onClose"> </q-btn>
      </slot>
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
      required: false,
      default: 'mdi-home',
    },
    title: {
      type: String,
      required: false,
      default: 'My Page',
    },
    contentClass: {
      type: String,
      required: false,
      default: 'q-pa-sm',
    },
    pageClass: {
      type: String,
      required: false,
      default: 'column',
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
