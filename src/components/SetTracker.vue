<template>
  <div
    class="m-number-tapper relative-position"
    v-ripple
    @click="$emit('input', value + 1)"
    v-touch-hold.mouse="reset"
    :style="style"
  >
    <span class="text-body1">{{ value }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Number,
      required: false,
      default: 1,
    },
    target: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: 'secondary',
    },
    completedColor: {
      type: String,
      required: false,
      default: 'accent',
    },
    size: {
      type: String,
      required: false,
      default: '40px',
    },
  },
  setup(_props, _ctx) {
    const style = computed(() => {
      return {
        height: _props.size,
        width: _props.size,
        background:
          _props.value >= _props.target
            ? `var(--q-color-${_props.completedColor})`
            : `var(--q-color-${_props.color})`,
      }
    })

    function reset() {
      _ctx.emit('input', 0)
    }

    return { style, reset }
  },
})
</script>

<style lang="scss" scoped>
.m-number-tapper {
  border-radius: 100%;
  color: white;
  display: grid;
  place-items: center;
}
</style>
