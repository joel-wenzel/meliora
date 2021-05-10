<template>
  <div
    class="m-number-tapper relative-position"
    :class="classes"
    v-ripple="!disable"
    @click="onTap"
    v-touch-hold.mouse="onShortHold"
    :style="style"
  >
    <span class="text-body1">{{ isDormant ? '' : value }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Number,
      required: false,
      default: 0,
    },
    /**
     * Start the tapper with a blank state which doesnt display anything until first tapped
     * Default: false
     */
    dormant: {
      type: Boolean,
      default: false,
      required: false,
    },
    min: {
      type: Number,
      required: false,
      default: 0,
    },
    max: {
      type: Number,
      required: false,
      default: 10,
    },
    /**
     * If a target is specified and the number value matches that target it will display with a different background color
     * Default: null
     */
    target: {
      type: Number,
      required: false,
      default: null,
    },
    /**
     * Decrement when tapped instead of incrementing
     */
    decrement: {
      type: Boolean,
      default: false,
      required: false,
    },
    size: {
      type: String,
      required: false,
      default: '40px',
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    // When min or max range is reached the tapper will "wrap" to the other extreme and begin the sequence
    // a new.
    wrap: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  setup(_props, _ctx) {
    const isDormant = ref<boolean>(_props.dormant)
    const isDecrement = ref<boolean>(_props.decrement)

    const style = computed(() => {
      return {
        height: _props.size,
        width: _props.size,
      }
    })

    const classes = computed(() => {
      return {
        'm-number-tapper--dormant': isDormant.value,
        'm-number-tapper--target':
          !isDormant.value && _props.target === _props.value,
        'm-number-tapper--disabled': _props.disable,
      }
    })

    function onShortHold() {
      isDecrement.value = !isDecrement.value
    }

    function onTap() {
      if (_props.disable) {
        return
      }
      // if dormant, we dont increment on first tap
      const raw = isDormant.value
        ? _props.value
        : // @ts-ignore
          _props.value + (!isDecrement.value * 2 - 1)

      if (!_props.wrap) {
        const { clamped, inRange } = clamp(raw, _props.min, _props.max)

        if (inRange) {
          _ctx.emit('input', clamped)
        }
      } else {
        let wrapped = raw
        if (raw < _props.min) {
          wrapped = _props.max
        } else if (raw > _props.max) {
          wrapped = _props.min
        }

        _ctx.emit('input', wrapped)
      }

      isDormant.value = false
    }

    return { style, classes, onShortHold, onTap, isDormant }
  },
})

function clamp(num, min, max) {
  return {
    clamped: Math.min(Math.max(num, min), max),
    inRange: num <= max && num >= min,
  }
}
</script>

<style lang="scss" scoped>
.m-number-tapper {
  border-radius: 100%;
  color: white;
  display: grid;
  place-items: center;
  background: var(--q-color-primary-light);

  &--dormant {
    background: #eee;
  }

  &--target {
    background: var(--q-color-primary-dark);
    color: white;
  }

  &--disabled {
    opacity: 0.65;
  }
}

body.body--dark .m-number-tapper--dormant {
  background: #6f6f6f;
}
</style>
