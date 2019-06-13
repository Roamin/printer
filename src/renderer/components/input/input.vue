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

const prefixCls = 'c-input'

export default {
  name: 'Input',
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
        return ['text', 'textarea', 'password'].includes(value)
      },
      default: 'text'
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
          'circle': this.circle
        }
      ]
    },
    tagName () {
      if (this.$attrs.type === 'textarea') return 'textarea'

      return 'input'
    }
  },
  methods: {
    handleClear () {

    }
  }
}
</script>
