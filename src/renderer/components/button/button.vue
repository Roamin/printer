<template>
  <component :is="tagName"
             :class="classnames"
             v-bind="$attrs">
    <Icon :type="icon"
          v-if="icon" />
    <slot />
  </component>

</template>

<script>
import Icon from '../icon'

const prefixCls = 'c-button'

export default {
  name: 'Button',
  inheritAttrs: false,
  components: {
    Icon
  },
  props: {
    icon: {
      type: String
    },
    size: {
      type: String
    },
    type: {
      validator: (value) => {
        return ['default', 'primary', 'danger', 'warning'].includes(value)
      },
      default: 'default'
    },
    circle: {
      type: [Boolean, Number],
      default: false
    }
  },
  data () {
    return {

    }
  },
  computed: {
    classnames () {
      return [
        `${prefixCls}`,
        {
          [`${this.size}`]: this.size,
          [`${this.type}`]: this.type,
          circle: this.circle
        }
      ]
    },
    tagName () {
      if (typeof this.$attrs.href !== 'undefined') return 'a'

      if (typeof this.$attrs.to !== 'undefined') return 'router-link'

      return 'button'
    }
  }
}
</script>
