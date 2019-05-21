<template>
  <div class="print">
    <header class="print__header">
      <div class="left">
        <Button class="button"
                icon="image"
                @click.native="showUploadModal" />
        <Button class="button"
                icon="table" />
        <Button class="button"
                icon="undo" />
        <Button class="button"
                icon="redo" />
      </div>

      <div class="right">
        <Button class="button"
                icon="help-circle" />
        <Button class="button"
                icon="layout" />
        <Button class="button"
                icon="save" />
      </div>
    </header>
    <div class="print__body">
      <div class="edit">
        <textarea v-model="content"></textarea>
      </div>
      <div class="preview">
        <article class="markdown-content"
                 v-html="renderedContent"></article>
      </div>
    </div>

    <Modal title="图片上传"
           v-model="uploadModal.visible">
      <Upload />
    </Modal>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'

import Button from '@/components/button'
import Modal from '@/components/modal'
import Upload from '@/components/upload'

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
    Button,
    Modal,
    Upload
  },
  data () {
    return {
      content: '',
      uploadModal: {
        visible: true
      }
    }
  },
  computed: {
    renderedContent () {
      return md.render(this.content)
    }
  },
  methods: {
    getArticle (path) {
      this.$fetch('repository.getArticle', { path }).then(res => {
        this.content = res
      })
    },
    showUploadModal () {
      this.uploadModal.visible = true
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

<style lang="scss">
@import "~@/styles/markdown";
</style>
<style lang="scss" scoped>
.print {
  display: flex;
  height: 100%;
  flex-direction: column;

  &__header {
    flex-shrink: 0;
    display: flex;
    padding: 0 16px;
    line-height: 50px;
    justify-content: space-between;
    border-bottom: 1px solid $border-color;

    .button {
      color: $text-color-dark;
    }
  }

  &__body {
    position: relative;
    display: flex;
    flex: auto;
    height: 100%;
    overflow: hidden;

    .edit {
      flex: 1;
      border-right: 1px solid $border-color;
    }

    .preview {
      flex: 1;
    }
  }
}

.edit {
  textarea {
    padding: 24px;
    width: 100%;
    height: 100%;
    border: none;
    color: $text-color;
    font-size: $font-size-base;
    word-break: break-word;
    line-height: 1.75;
    resize: none;
  }
}

article {
  overflow: auto;
  padding: 24px;
  height: 100%;
}
</style>
