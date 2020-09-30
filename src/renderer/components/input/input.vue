<template>
  <div>
    <template v-if="type === 'textarea'">
      <textarea :class="classnames" v-bind="$attrs" v-model="val"></textarea>
    </template>
    <template v-else>
      <input :class="classnames" :type="type" v-bind="$attrs" v-model="val" />
    </template>
  </div>
</template>

<script>
// import Icon from '../icon'

const prefixCls = 'c-input'

export default {
  name: 'Input',
  inheritAttrs: false,
  components: {
    // Icon
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
        return ['text', 'textarea', 'password', 'number'].includes(value)
      },
      default: 'text'
    },
    value: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      val: ''
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
      if (this.$attrs.type === 'textarea') return 'textarea'

      return 'input'
    }
  },
  methods: {
    handleClear () {

    }
  },
  watch: {
    value (val) {
      if (val !== this.val) {
        this.val = val
      }
    },
    val (val) {
      if (val !== this.value) {
        this.$emit('input', val)
      }
    }
  },
  created () {
    if (this.val !== this.value) {
      this.val = this.value
    }
  }
}
</script>
