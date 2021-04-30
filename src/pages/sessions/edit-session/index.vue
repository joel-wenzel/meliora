<template>
  <q-page>
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title> {{ title }}</q-toolbar-title>
      <q-space />
      <q-btn dense flat icon="mdi-close" @click="onClose">
        <q-tooltip content-class="bg-white text-primary"></q-tooltip>
      </q-btn>
    </q-toolbar>
    <q-toolbar inset class="session-subbar"> {{ sessionDate }} </q-toolbar>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import Session from 'src/store/sessions/session.orm'
import moment from 'moment'

export default defineComponent({
  components: {},
  setup(_props, _ctx) {
    const session = computed(() =>
      Session.query().withAllRecursive().find(_ctx.root.$route.params.id)
    )

    if (!session.value) {
      // TODO maybe have a 404 page instead
      _ctx.root.$router.push('/sessions')
    }

    const title = computed(() => `${session.value?.workout.name} Session`)
    const sessionDate = computed(() => moment(session.value?.date))

    function onClose() {
      _ctx.root.$router.back()
    }

    return { session, title, onClose, sessionDate }
  },
})
</script>

<style lang="scss" scoped>
.session-subbar {
  min-height: 36px;
}
</style>
