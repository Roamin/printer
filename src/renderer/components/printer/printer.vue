<template>
  <div :class="classnames">
    <header :class="`${prefixCls}__header`">
      <div class="toolbar">
        <div class="left">
          <Button class="button"
                  icon="image" />
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
      </div>
    </header>
    <div :class="`${prefixCls}__body`">
      <Split>
        <template v-slot:left>
          <div class="editor">
            <div class="line-numbers">
              <div class="line-number line-number--placeholder">{{ valSegments.length }}</div>
            </div>
            <div class="textarea-wrapper">
              <div class="textarea-simulator">
                <div class="textarea-simulator__segment"
                     v-for="(segment, line) in valSegments"
                     :key="line + '-' + segment">
                  <div class="line-number">{{ line + 1 }}</div>
                  <p class="paragraph">{{ segment || '\r' }}</p>
                </div>
              </div>
              <textarea ref="textarea"
                        v-model="val"></textarea>
            </div>
          </div>
        </template>
        <template v-slot:right>
          <div class="previewer"
               @scroll="handleScroll($event, 'textarea')">
            <article class="markdown-content"
                     v-html="html"></article>
          </div>
        </template>
      </Split>
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'

import typeOf from 'common/utils/typeof'

import Button from '../button'
import Icon from '../icon'
import Split from '../split'

const prefixCls = 'c-printer'
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
  name: 'Printer',
  components: {
    Button,
    Icon,
    Split
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      prefixCls,
      val: '',
      lines: 30
    }
  },
  computed: {
    classnames () {
      return [
        `${prefixCls}`
      ]
    },
    html () {
      return md.render(this.val)
    },
    valSegments () {
      return this.val.split(/\r*\n/)
    }
  },
  methods: {
    update () {
      this.$emit('input', this.val)
    },
    handleScroll (event, ref) {
      const another = this.$refs[ref]
      const { scrollHeight, scrollTop } = event.target

      another.scrollTop = another.scrollHeight * (scrollTop / scrollHeight)
    }
  },
  created () {
    if (this.val !== this.value) {
      this.val = this.value
    }
  },
  mounted () {
    console.log(this.$refs.textarea.scrollHeight)
  },
  watch: {
    value (val) {
      if (this.val !== val) {
        this.val = val
      }
    },
    val (val) {
      const matched = val.match(/\r*\n/g)

      this.lines = typeOf(matched) === 'null' ? 1 : matched.length + 1
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/markdown";
</style>