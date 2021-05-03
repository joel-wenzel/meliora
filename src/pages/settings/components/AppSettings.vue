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
          @input="updateUOM"
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
import { computed, defineComponent, ref, watch } from '@vue/composition-api'
import { AppSettings } from 'src/store/application'
import moment from 'moment'
import updateUoMInDatabase from 'src/model/util/uom.util'
export default defineComponent({
  setup(_props, _ctx) {
    const settings = _ctx.root.$store.getters['settings'] as AppSettings

    const bodyWeight = ref<number>(settings.bodyWeight)

    watch(
      computed(() => _ctx.root.$store.getters['settings'].bodyWeight),
      (newWeight) => {
        bodyWeight.value = newWeight
      }
    )
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

    function updateUOM(val) {
      updateSettings()
      _ctx.root.$store.dispatch('showDialog', {
        comp: 'MConfirmDialog',
        data: {
          title: 'Update Measurements',
          message: `Do you want us to update existing measurements to ${val}? It is not recommended to switch UoM's often.`,
          callback: updateUOMValues,
          callbackData: val,
        },
      })
    }

    function updateUOMValues(val) {
      updateUoMInDatabase(val, _ctx.root.$store)
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
      updateUOM,
    }
  },
})
</script>
