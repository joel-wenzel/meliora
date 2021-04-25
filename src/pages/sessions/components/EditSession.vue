<template>
  <q-card>
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title> {{ session.workoutName }} </q-toolbar-title>
      <q-space />
      <q-btn dense flat icon="mdi-close" v-close-popup>
        <q-tooltip content-class="bg-white text-primary"></q-tooltip>
      </q-btn>
    </q-toolbar>
    <q-card-section> </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Session } from '@/model/session.model'
import { defineComponent, inject, Ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const session = inject('activeSession') as Ref<Session>
    return { session }
  },
})
</script>

<style lang="scss" scoped></style>
