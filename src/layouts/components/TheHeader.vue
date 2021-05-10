<template>
  <q-header elevated class="m-primary-container">
    <q-toolbar>
      <q-toolbar-title class="m-title row items-center">
        <q-avatar>
          <q-icon name="mdi-webhook" size="lg"></q-icon>
        </q-avatar>
        <span class="q-px-sm">Meliora</span>
      </q-toolbar-title>

      <q-btn flat round icon="mdi-dots-vertical">
        <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
          content-class="m-app-menu"
        >
          <q-list style="min-width: 100px">
            <template v-for="(option, index) in options">
              <q-item
                :key="option.title"
                clickable
                v-close-popup
                :to="option.route"
                class="text-no-wrap"
              >
                <q-item-section avatar style="min-width: unset">
                  <q-icon :name="option.icon"></q-icon>
                </q-item-section>
                <q-item-section>{{ option.title }}</q-item-section>
              </q-item>
              <q-separator v-if="index != options.length - 1" :key="index" />
            </template>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup(_props, _ctx) {
    const classes = computed(() => {
      return {
        'bg-primary': !_ctx.root.$q.dark.isActive,
        'bg-grey-10': _ctx.root.$q.dark.isActive,
        'text-white': true,
      }
    })

    const options = [
      {
        title: 'Exercise List',
        icon: 'mdi-weight-lifter',
        route: '/exercises',
      },
      {
        title: 'Settings',
        icon: 'mdi-cog',
        route: '/settings',
      },
      {
        title: 'Help & Feedback',
        icon: 'mdi-help',
        route: '/exercises',
      },
    ]
    return { classes, options }
  },
})
</script>
<style lang="scss" scoped></style>
