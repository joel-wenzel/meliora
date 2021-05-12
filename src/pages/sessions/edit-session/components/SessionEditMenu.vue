<template>
  <q-menu>
    <q-list class="edit-session-menu-list">
      <q-item clickable v-close-popup @click="onViewNotes">
        <q-item-section side>
          <q-icon name="mdi-message-bulleted"></q-icon>
        </q-item-section>
        <q-item-section no-wrap>
          <q-item-label>View Notes</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup @click="onEdit" v-if="session.completed">
        <q-item-section side>
          <q-icon name="mdi-pencil"></q-icon>
        </q-item-section>
        <q-item-section no-wrap>
          <q-item-label>Update Session</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup @click="onDelete">
        <q-item-section side>
          <q-icon name="mdi-delete"></q-icon>
        </q-item-section>
        <q-item-section no-wrap>
          <q-item-label>Delete Session</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import Session from 'src/store/sessions/session.orm'

export default defineComponent({
  props: {
    sessionId: {
      type: String,
      required: true,
    },
  },
  setup(_props, _ctx) {
    function onViewNotes() {
      // TODO
    }

    const session = computed(() => Session.find(_props.sessionId) as Session)

    function onEdit() {
      session.value?.$update({
        completed: false,
      })
    }

    function onDelete() {
      _ctx.root.$store.dispatch('showDialog', {
        comp: 'MConfirmDialog',
        data: {
          title: 'Delete Session',
          message: 'This cannot be undone. Are you sure you wish to continue?',
          callback: confirmedDelete,
        },
      })
    }

    function confirmedDelete() {
      _ctx.root.$router.back()
      Session.deleteSession(_props.sessionId)
    }

    return { session, onViewNotes, onEdit, onDelete }
  },
})
</script>
<style lang="scss" scoped>
.edit-session-menu-list {
  & .q-item {
    min-height: unset;
  }
}
</style>
