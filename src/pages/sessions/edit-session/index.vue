<template>
  <q-page class="column" v-if="session">
    <q-toolbar class="m-primary-container" elevated>
      <q-toolbar-title shrink> {{ title }}</q-toolbar-title>
      <q-space />
      <q-btn dense flat icon="mdi-close" @click="onClose">
        <q-tooltip content-class="bg-white text-primary"></q-tooltip>
      </q-btn>
    </q-toolbar>
    <q-toolbar
      inset
      class="m-primary-sub-container session-subbar row justify-between"
    >
      <span>{{ sessionDate }}</span>
      <q-btn unelevated icon="mdi-dots-vertical" padding="0">
        <session-edit-menu :sessionId="session.id"></session-edit-menu>
      </q-btn>
    </q-toolbar>
    <q-list class="q-ma-xs">
      <div v-for="sEx in session.sessionExercises" :key="sEx.id">
        <session-exercise
          :sessionExerciseId="sEx.id"
          :readonly="isLocked"
        ></session-exercise>
        <q-separator></q-separator>
      </div>
    </q-list>
    <div class="col-grow column justify-end q-pa-md">
      <div class="row items-end">
        <q-input
          v-model="bodyWeight"
          class="q-mr-md col-5"
          dense
          type="number"
          label="Body Weight"
          :disable="isLocked"
          :suffix="$labels.uom"
        ></q-input>
        <q-btn
          color="primary-dark"
          class="col-grow"
          @click="onFinish"
          :disable="isLocked"
          >Finish Session</q-btn
        >
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import SessionEditMenu from './components/SessionEditMenu.vue'
import SessionExercise from './components/SessionExercise.vue'
import { computed, defineComponent, ref } from '@vue/composition-api'
import Session from 'src/store/sessions/session.orm'
import moment from 'moment'

export default defineComponent({
  components: { SessionExercise, SessionEditMenu },
  setup(_props, _ctx) {
    const session = computed(
      () =>
        Session.query()
          .with(['sessionExercises', 'workout'])
          .find(_ctx.root.$route.params.id) as Session
    )

    const isLocked = computed(() => session.value?.completed)

    if (!session.value) {
      // TODO maybe have a 404 page instead
      _ctx.root.$router.push('/sessions')
    }

    const title = computed(() => `${session.value?.workout.name} Session`)
    const sessionDate = computed(() =>
      moment(session.value?.date).format(_ctx.root.$labels.dateFormat)
    )

    const bodyWeight = ref<number>(session.value.bodyWeight)

    function onClose() {
      _ctx.root.$router.back()
    }

    function onFinish() {
      Session.completeSession(session.value.id, bodyWeight.value)
      _ctx.root.$router.back()
    }

    return {
      session,
      title,
      isLocked,
      bodyWeight,
      sessionDate,
      onClose,
      onFinish,
    }
  },
})
</script>

<style lang="scss" scoped>
.session-subbar {
  min-height: 36px;
}
</style>
