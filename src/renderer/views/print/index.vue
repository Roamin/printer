<template>
  <div class="print">
    <Printer v-model="content" />
  </div>
</template>

<script>
import Button from '@/components/button'
import Printer from '@/components/printer'

export default {
  name: 'Article',
  components: {
    Button,
    Printer
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    getArticle (path) {
      this.$fetch('repository.getArticle', { path }).then(res => {
        this.content = res
      })
    }
  },
  created () {
    const { path = '/Users/vinci/Workspace/GitHub/printer/static/repository/roam/blog/Markdown/md.md' } = this.$route.params

    this.getArticle(path)
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.print {
  height: 100%;
}
</style>
