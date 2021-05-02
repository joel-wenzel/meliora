<template>
  <fragment>
    <q-item-label header>Application</q-item-label>
    <q-item class="q-mb-sm">
      <q-item-section>
        <q-input
          v-model="bodyWeight"
          label="Body Weight"
          type="number"
          :suffix="uom"
          @blur="updateSettings"
        ></q-input>
      </q-item-section>
    </q-item>
    <q-item class="q-mb-sm">
      <q-item-section>
        <q-select
          v-model="uom"
          map-options
          emit-value
          :options="uomOptions"
          label="Unit of Measure"
          @input="updateSettings"
        />
      </q-item-section>
    </q-item>
    <q-item class="q-mb-sm">
      <q-item-section>
        <q-select
          v-model="dateFormat"
          map-options
          emit-value
          :options="dateOptions"
          label="Date Format"
          @input="updateSettings"
        />
      </q-item-section>
    </q-item>
  </fragment>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { AppSettings } from 'src/store/application'
import moment from 'moment'
export default defineComponent({
  setup(_props, _ctx) {
    const settings = _ctx.root.$store.getters['settings'] as AppSettings

    const bodyWeight = ref<number>(settings.bodyWeight)
    const uom = ref<string>(settings.uom)

    const uomOptions = [
      {
        label: 'Pounds',
        value: 'lbs',
      },
      {
        label: 'Kilograms',
        value: 'kg',
      },
    ]

    function updateSettings() {
      _ctx.root.$store.dispatch('updateSettings', {
        bodyWeight: bodyWeight.value,
        uom: uom.value,
        dateFormat: dateFormat.value,
      })
    }

    const dateFormat = ref<string>(settings.dateFormat)
    const now = moment()
    const dateOptions = [
      {
        label: now.format('MMMM D YYYY, h:mm A'),
        value: 'MMMM D YYYY, h:mm A',
      },
      {
        label: now.format('MMMM Do YYYY, h:mm A'),
        value: 'MMMM Do YYYY, h:mm A',
      },
    ]
    return {
      bodyWeight,
      uom,
      uomOptions,
      dateFormat,
      dateOptions,
      updateSettings,
    }
  },
})
</script>
