<template>
  <form :class="classnames"
        @submit="handleSubmit">
    <Icon class="icon icon-search"
          type="search" />
    <input type="text"
           placeholder="Search ..."
           autocomplete="off"
           spellcheck="false"
           v-model.trim="val">
    <Icon class="icon icon-close"
          type="close-cricle-filled"
          @click.native="handleClear"
          v-if="val !== ''" />
  </form>
</template>

<script>
import Icon from '../icon'

const prefixCls = 'c-search'

export default {
  name: 'Search',
  components: {
    Icon
  },
  props: {
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
        `${prefixCls}`
      ]
    }
  },
  methods: {
    handleClear () {
      this.val = ''

      this.emitSearch()
    },
    handleSubmit (e) {
      e.preventDefault()

      this.emitSearch()
    },
    emitSearch () {
      this.$emit('on-search', this.val)
    }
  },
  watch: {
    value (val) {
      if (val !== this.val) {
        this.val = val
      }
    }
  }
}
</script>
