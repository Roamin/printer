<template>
  <div class="article">
    <header>
      <Button
        class="button"
        icon="edit"
        :to="{
          path: '/editor',
          query: {
            path: article.path,
          },
        }"
      />
    </header>
    <div class="article__body">
      <article class="markdown-content" v-html="renderedContent"></article>
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import { mapState } from 'vuex'

import Button from '@/components/button'

const md = new MarkdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs ${lang}"><code>${hljs.highlight(lang, str, true).value}</code></pre>`
      } catch (error) {
        console.log(error)
      }
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})

export default {
  name: 'Article',
  components: {
    Button
  },
  props: {

  },
  data () {
    return {
      content: ''
    }
  },
  computed: {
    ...mapState('workspace', [
      'article'
    ]),
    renderedContent () {
      return md.render(this.content)
    }
  },
  methods: {
    getArticle () {
      const { path } = this.article

      this.$fetch('repository.getArticle', { path }).then(res => {
        this.content = res
      })
    }
  },
  watch: {
    article ({ path }) {
      if (path !== '') this.getArticle()
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/markdown";
</style>
<style lang="scss" scoped>
.article {
  display: flex;
  height: 100%;
  flex-direction: column;

  header {
    flex-shrink: 0;
    padding: 0 16px;
    line-height: 50px;
    text-align: right;

    .button {
      color: var(--text-color);
    }
  }

  &__body {
    position: relative;
    flex: auto;
    height: 100%;
    overflow: hidden;

    article {
      overflow: scroll;
      padding: 0 28px;
      height: 100%;
    }
  }
}
</style>
