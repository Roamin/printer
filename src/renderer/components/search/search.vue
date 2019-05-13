<template>
  <form :class="classnames" onSubmit="{this.handleSubmit}">
    <Icon class="icon icon-search" type="search"/>
    <input
      type="text"
      placeholder="Search ..."
      autocomplete="off"
      spellcheck="false"
      value="value"
      onChange="{this.handleChange}"
    >
    <Icon class="icon icon-close" type="close-fill" @click.native="handleClear"/>
  </form>
</template>

<script>
import Icon from '../icon'

const pefixCls = 'c-search'

export default {
  name: 'Search',
  components: {
    Icon
  },
  props: {

  },
  data () {
    return {

    }
  },
  computed: {
    classnames () {
      return [
        `${pefixCls}`
      ]
    }
  },
  methods: {
    handleClear () {

    }
  }
}
</script>
