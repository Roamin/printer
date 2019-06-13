<template>
  <div v-show="visible">
    <div :class="`${prefixCls}__mask`"
         @click="maskClickHandle"></div>

    <div :class="classnames">
      <Icon :class="`${prefixCls}__close`"
            type="close"
            @click.native="closeClickHandle" />
      <header :class="`${prefixCls}__header`">
        <slot name="header">
          {{title}}
        </slot>
      </header>
      <div :class="`${prefixCls}__body`">
        <slot />
      </div>
      <footer :class="`${prefixCls}__footer`">
        <slot name="footer">
          <Button @click.native="cancelClickHandle">Cancel</Button>
          <Button type="primary"
                  @click.native="confirmClickHandle">Submit</Button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
import Button from '../button'
import Icon from '../icon'

const prefixCls = 'c-modal'

export default {
  name: 'Modal',
  components: {
    Button,
    Icon
  },
  props: {
    title: {
      type: [Number, String],
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      prefixCls,
      visible: false
    }
  },
  computed: {
    classnames () {
      return [
        `${prefixCls}`
      ]
    }
  },
  methods: {
    closeModal () {
      this.visible = false
      this.$emit('input', this.visible)
      this.$emit('on-close')
    },
    maskClickHandle () {
      if (this.maskClosable) this.closeModal()
    },
    closeClickHandle () {
      this.closeModal()
    },
    cancelClickHandle () {
      this.closeModal()
      this.$emit('on-cancel')
    },
    confirmClickHandle () {
      this.closeModal()
      this.$emit('on-confirm')
    }
  },
  mounted () {
    if (this.visible !== this.value) {
      this.visible = this.value
    }
  },
  watch: {
    value (visible) {
      if (this.visible !== visible) {
        this.visible = visible
      }
    }
  }
}
</script>
