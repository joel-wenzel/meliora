<template>
  <q-page>
    <div class="col-6 q-pa-sm day-card" v-for="card of days" :key="card.title">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ card.title }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div
            class="text-subtitle2"
            v-for="item in card.items"
            :key="item.name"
          >
            {{ item.name }} - {{ item.text }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const days = [
      {
        title: 'Yesterday',
        items: [
          {
            name: 'SQ',
            text: '5x5 115lb',
          },
          {
            name: 'BP',
            text: '5x5 115lb',
          },
          {
            name: 'ROW',
            text: '5x5 95lb',
          },
        ],
      },
      {
        title: 'Next',
        items: [
          {
            name: 'SQ',
            text: '5x5 120lb',
          },
          {
            name: 'OHP',
            text: '5x5 45lb',
          },
          {
            name: 'DL',
            text: '1x5 95lb',
          },
        ],
      },
      {
        title: 'Next2',
        items: [
          {
            name: 'SQ',
            text: '5x5 120lb',
          },
          {
            name: 'OHP',
            text: '5x5 45lb',
          },
          {
            name: 'DL',
            text: '1x5 95lb',
          },
        ],
      },
      {
        title: 'Nex32',
        items: [
          {
            name: 'SQ',
            text: '5x5 120lb',
          },
          {
            name: 'OHP',
            text: '5x5 45lb',
          },
          {
            name: 'DL',
            text: '1x5 95lb',
          },
        ],
      },
    ]
    return { days }
  },
})
</script>
<style scoped>
.day-card {
  height: fit-content;
}
</style>
