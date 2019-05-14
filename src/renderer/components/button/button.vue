<template>
  <button :class="classnames">
    <Icon :type="icon"
          v-if="icon" />
    <slot />
  </button>
</template>

<script>
import Icon from '../icon'

const pefixCls = 'c-button'

export default {
  name: 'Button',
  components: {
    Icon
  },
  props: {
    icon: {
      type: String,
      default: false
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
        `${pefixCls}`,
        {
          'circle': this.circle
        }
      ]
    }
  },
  methods: {
    handleClear () {

    }
  }
}
</script>
