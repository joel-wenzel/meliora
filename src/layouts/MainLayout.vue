<template>
  <q-layout view="hHh LpR fFf">
    <q-header v-if="!fullScreen" elevated class="bg-primary text-white">
      <q-toolbar>
        <!-- <q-btn dense flat round icon="mdi-menu" @click="leftDrawerOpen = !leftDrawerOpen" /> -->

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-btn flat round icon="mdi-dots-vertical">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Exercise List</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="$store.dispatch('clearData')"
              >
                <q-item-section>Clear Data</q-item-section>
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

    <!-- <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      
    </q-drawer> -->

    <q-page-container>
      <transition
        appear
        :enter-active-class="routeEnterAnim"
        :leave-active-class="routeLeaveAnim"
      >
        <router-view :key="$route.path" />
      </transition>
    </q-page-container>
    <q-dialog :value="dialog.show" @hide="dismissDialog">
      <component v-bind:is="dialog.comp" :data="dialog.data"></component>
    </q-dialog>
    <q-footer v-if="!fullScreen">
      <q-tabs dense no-caps class="shadow-2">
        <q-route-tab
          name="sessions"
          icon="mdi-home"
          to="/sessions"
          label="sessions"
          exact
        />
        <q-route-tab
          name="history"
          icon="mdi-history"
          to="/history"
          label="history"
          exact
        />
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

    function dismissDialog() {
      console.log('dismiss')
      _ctx.root.$store.dispatch('dismissDialog')
    }

    return {
      fullScreen,
      ...setupPageAnim(_ctx),
      dialog,
      dismissDialog,
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
.slideInUp {
  animation: slideInUp;
  animation-duration: 0.3s;
}

.slideOutDown {
  animation: slideOutDown;
  animation-duration: 0.3s;
}
</style>
