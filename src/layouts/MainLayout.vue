<template>
  <q-layout view="hHh LpR fFf">
    <q-header v-if="!fullScreen" elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="m-title row items-center">
          <q-avatar>
            <q-icon name="mdi-webhook" size="lg"></q-icon>
          </q-avatar>
          <span class="q-px-sm">Meliora</span>
        </q-toolbar-title>

        <q-btn flat round icon="mdi-dots-vertical">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup to="/exercises">
                <q-item-section>Exercise List</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup to="/settings">
                <q-item-section>Settings</q-item-section>
              </q-item>

              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Help &amp; Feedback</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <transition
        appear
        :enter-active-class="routeEnterAnim"
        :leave-active-class="routeLeaveAnim"
      >
        <router-view :key="$route.path" />
      </transition>
    </q-page-container>
    <q-footer v-if="!fullScreen">
      <q-tabs dense no-caps class="shadow-2">
        <q-route-tab
          name="sessions"
          icon="mdi-home"
          to="/sessions"
          label="sessions"
          exact
        />
        <!-- <q-route-tab
          name="history"
          icon="mdi-history"
          to="/history"
          label="history"
          exact
        /> -->
        <q-route-tab
          name="progress"
          icon="mdi-chart-timeline-variant"
          to="/progress"
          label="progress"
          exact
        />
        <q-route-tab
          name="workouts"
          icon="mdi-dumbbell"
          to="/workouts"
          label="workouts"
          exact
        />
      </q-tabs>
    </q-footer>
    <q-dialog :value="dialog.show" @hide="dismissDialog">
      <component v-bind:is="dialog.comp" :data="dialog.data"></component>
    </q-dialog>
    <transition
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
    >
      <q-banner
        class="notification-banner"
        :class="notification.contentClass"
        rounded
        v-if="notification.show"
      >
        {{ notification.message }}
      </q-banner>
    </transition>
  </q-layout>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  SetupContext,
} from '@vue/composition-api'

export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup(_props, _ctx) {
    //animated slideInUp
    const fullScreen = computed(() => _ctx.root.$route.meta?.fullscreen)

    const dialog = computed(() => _ctx.root.$store.getters.dialog)

    const notification = computed(() => _ctx.root.$store.getters.notification)

    function dismissDialog() {
      _ctx.root.$store.dispatch('dismissDialog')
    }

    return {
      fullScreen,
      ...setupPageAnim(_ctx),
      dialog,
      dismissDialog,
      notification,
    }
  },
})

function setupPageAnim(_ctx: SetupContext) {
  const routeEnterAnim = ref()
  const routeLeaveAnim = ref()

  _ctx.root.$router.beforeEach((to, from, next) => {
    const toFull = to.meta?.fullscreen
    const fromFull = from.meta?.fullscreen

    if (toFull && !fromFull) {
      routeEnterAnim.value = 'slideInUp'
      routeLeaveAnim.value = ''
    } else if (!toFull && fromFull) {
      routeEnterAnim.value = ''
      routeLeaveAnim.value = 'slideOutDown'
    } else {
      routeEnterAnim.value = ''
      routeLeaveAnim.value = ''
    }
    next()
  })

  return { routeEnterAnim, routeLeaveAnim }
}
</script>
<style lang="scss" scoped>
.m-title {
  letter-spacing: 1px;
  font-size: 1.7em;
}
.slideInUp {
  animation: slideInUp;
  animation-duration: 0.2s;
}

.slideOutDown {
  animation: slideOutDown;
  animation-duration: 0.2s;
}

.notification-banner {
  position: fixed;
  box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.3);
  bottom: 32px;
  right: 16px;
  width: calc(100% - 32px);
}
</style>
