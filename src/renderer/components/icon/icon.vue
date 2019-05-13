<template>
  <i :class="classnames">
    <svg aria-hidden="true">
      <use :xlink:href="'#icon-' + type"></use>
    </svg>
    <slot/>
  </i>
</template>

<script>
const pefixCls = 'c-icon'

export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      required: true
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
        `${pefixCls}`,
        {
          [`${pefixCls}--spin`]: this.spin
        }
      ]
    }
  }
}
</script>