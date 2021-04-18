<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar >
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
      <router-view />
    </q-page-container>

    <q-footer>
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

import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup() {
    const leftDrawerOpen = ref(false)


    return { leftDrawerOpen }
  }
});
</script>
