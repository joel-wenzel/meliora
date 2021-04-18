<template>
  <q-select
    
    filled
    input-debounce="0"
    no-error-icon
    label="Select Exercise"
    :options="exerciseList"
    option-value="id"
    option-label="name"
    emit-value
    map-options
    v-bind="$attrs"
    v-on="$listeners"
    @input="test"
  >
    <template #before-options>
      <q-input class="q-px-md" placeholder="Add Exercise"></q-input>
    </template>
  </q-select>
</template>
<script lang="ts">
import { Exercise } from '@/model/workout.model'
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  
  setup(_props, _ctx) {
    const exerciseList = computed(() => _ctx.root.$store.getters.exercises as Array<Exercise>)

    function test(val) {
      console.log(val)
    }

    function createExercise(val, done) {
     
      if (val.length > 0) {
        if (!exerciseList.value.some(ex => ex.name === val)) {
          
          _ctx.root.$store.dispatch('addExercise', {
            name: val
          })
        }
        done(val, 'toggle')
      }
    }
    return { exerciseList, createExercise, test}
  },
})
</script>
