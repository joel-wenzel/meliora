<template>
  <q-page>
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title> {{ title }}</q-toolbar-title>
      <q-space />
      <q-btn dense flat icon="mdi-close" @click="onClose">
        <q-tooltip content-class="bg-white text-primary"></q-tooltip>
      </q-btn>
    </q-toolbar>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import Session from 'src/store/sessions/session.orm'

export default defineComponent({
  components: {},
  setup(_props, _ctx) {
    const session = computed(() =>
      Session.query().withAllRecursive().find(_ctx.root.$route.params.id)
    )

    const title = computed(() => `${session.value?.workout.name} Session`)

    function onClose() {
      _ctx.root.$router.back()
    }

    return { session, title, onClose }
  },
})
</script>

<style lang="scss" scoped>
.session-subbar {
  min-height: 36px;
}
</style>
