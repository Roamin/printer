<template>
  <div class="article">
    <header>
      <Button class="button"
              icon="edit" />
      <Button class="button"
              icon="fullscreen" />
    </header>
    <div class="article__body">
      <article class="markdown-content"
               v-html="renderedArticle"></article>
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'

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
    article: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  computed: {
    renderedArticle () {
      return md.render(this.article)
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
      color: $text-color;
    }
  }

  &__body {
    position: relative;
    flex: auto;
    height: 100%;
    overflow: hidden;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 40px;
    }
    &::before {
      top: 0;
      background-image: linear-gradient(#fff, transparent);
    }
    &::after {
      bottom: 0;
      background-image: linear-gradient(transparent, #fff);
    }

    article {
      overflow: scroll;
      padding: 40px 28px;
      height: 100%;
    }
  }
}
</style>
