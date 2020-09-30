<template>
  <div class="page">
    <Printer @on-save="saveArticle" v-model="content" />
  </div>
</template>

<script>
import Printer from './components/printer'

export default {
  name: 'Editor',
  components: {
    Printer
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    getArticle () {
      const { path } = this.$route.query
      this.$fetch('repository.getArticle', { path }).then(res => {
        this.content = res
      })
    },
    saveArticle () {
      const { path } = this.$route.query

      console.log({ path, text: this.content })

      this.$fetch('repository.saveArticle', { path, text: this.content }).then(res => {
        this.content = res
      })
    }
  },
  created () {
    this.getArticle()
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
}
</style>
