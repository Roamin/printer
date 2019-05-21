<template>
  <div :class="classnames">
    <slot />
    <transition name="fade">
      <div :class="`${prefixCls}__content`">{{ content }}</div>
    </transition>
  </div>
</template>

<script>
const prefixCls = 'c-tooltip'

export default {
  name: 'Tooltip',
  props: {
    content: {
      type: [Number, String],
      default: ''
    },
    placement: {
      validator (value) {
        return ['top', 'bottom', 'left', 'right'].includes(value)
      },
      default: 'bottom'
    }
  },
  data () {
    return {
      prefixCls
    }
  },
  computed: {
    classnames () {
      return [
        `${prefixCls}`,
        {
          [`${this.placement}`]: true
        }
      ]
    }
  },
  methods: {

  }
}
</script>
