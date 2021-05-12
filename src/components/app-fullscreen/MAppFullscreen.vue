<template>
  <q-page :class="pageClass">
    <q-page-sticky position="top" expand style="z-index: 10">
      <q-toolbar class="m-primary-container">
        <slot name="toolbar" :title="title" :icon="icon">
          <q-toolbar-title class="row items-center" shrink>
            <q-icon :name="icon" size="md" class="q-mr-sm" v-if="icon"></q-icon>
            <span>{{ title }}</span>
          </q-toolbar-title>
          <q-space />
          <q-btn dense flat icon="mdi-close" @click="onClose"> </q-btn>
        </slot>
      </q-toolbar>
    </q-page-sticky>

    <div
      style="margin-top: 50px"
      class="q-px-md q-py-sm column col-grow"
      :class="contentClass"
    >
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
      default: '',
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
