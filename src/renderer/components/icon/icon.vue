<template>
  <i :class="classnames"
     :style="styles">
    <svg aria-hidden="true">
      <use :xlink:href="'#icon-' + type"></use>
    </svg>
    <slot />
  </i>
</template>

<script>
const prefixCls = 'c-icon'

export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      required: true
    },
    size: {
      type: String
    },
    spin: {
      type: Boolean,
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
          [`${prefixCls}--spin`]: this.spin
        }
      ]
    },
    styles () {
      const styles = {}

      if (this.size) styles.fontSize = this.size

      return styles
    }
  }

}
</script>
