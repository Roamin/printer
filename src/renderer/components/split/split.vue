<template>
  <div :class="classnames">
    <div ref="leftPane"
         :class="`${prefixCls}__pane ${prefixCls}__pane--left`"
         :style="leftPaneStyles">
      <slot name="left" />
    </div>
    <div ref="spliter"
         :class="`${prefixCls}__spliter`"
         @mousedown="handleMousedown"></div>
    <div :class="`${prefixCls}__pane ${prefixCls}__pane--right`">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
const prefixCls = 'c-split'

export default {
  name: 'Split',
  props: {
    min: {
      type: [Number, String],
      default: '200px'
    }
  },
  data () {
    return {
      prefixCls,
      move: {
        isMoving: false,
        start: 0,
        offset: 0,
        oldOffset: 0
      },
      spliterOffset: {
        offsetWidth: 0,
        offsetLeft: 0
      }
    }
  },
  computed: {
    classnames () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}--is-moving`]: this.move.isMoving
        }
      ]
    },
    leftPaneStyles () {
      const w = '50%'
      const offset = this.move.offset - this.spliterOffset.offsetWidth / 2

      return {
        width: `calc(${w} + ${offset}px)`
      }
    },
    computedMax () {
      return this.spliterOffset.offsetLeft - parseFloat(this.min)
    }
  },
  methods: {
    handleMousedown (event) {
      this.move.oldOffset = this.move.offset
      this.move.start = event.pageX
      this.move.isMoving = true

      document.addEventListener('mousemove', this.handleMousemove, false)
      document.addEventListener('mouseup', this.handleMouseup, false)
    },
    handleMousemove (event) {
      const { start, oldOffset } = this.move
      const offset = event.pageX - start + oldOffset

      this.move.offset = Math.abs(offset) < this.computedMax
        ? offset
        : (offset > 0 ? this.computedMax : -this.computedMax)
    },
    handleMouseup () {
      this.move.isMoving = false

      document.removeEventListener('mousemove', this.handleMousemove, false)
      document.removeEventListener('mouseup', this.handleMouseup, false)
    }
  },
  mounted () {
    const { offsetWidth, offsetLeft } = this.$refs.spliter

    this.spliterOffset = {
      offsetWidth,
      offsetLeft
    }
  }
}
</script>