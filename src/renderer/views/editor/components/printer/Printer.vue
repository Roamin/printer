<template>
  <div :class="classnames">
    <header :class="`${prefixCls}__header`">
      <Toolbar @on-insert="insert" @on-save="handleSave" />
    </header>
    <div :class="`${prefixCls}__body`">
      <Split>
        <template v-slot:left>
          <div ref="editorScroll" style="height: 100%; overflow: auto">
            <div class="editor">
              <div class="line-numbers">
                <div class="line-number line-number--placeholder">
                  {{ valSegments.length }}
                </div>
              </div>
              <div class="textarea-wrapper">
                <div class="textarea-simulator">
                  <div
                    class="textarea-simulator__segment"
                    v-for="(segment, line) in valSegments"
                    :key="line + '-' + segment"
                  >
                    <div class="line-number">{{ line + 1 }}</div>
                    <p class="paragraph">{{ segment || " " }}</p>
                  </div>
                </div>
                <textarea
                  ref="textarea"
                  @paste="paste"
                  v-model="val"
                ></textarea>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:right>
          <div class="previewer" @scroll="handleScroll($event, 'editorScroll')">
            <article class="markdown-content" v-html="html"></article>
          </div>
        </template>
      </Split>
    </div>
  </div>
</template>

<script>
import typeOf from 'common/utils/typeof'

// import Button from '@/components/button'
// import Icon from '@/components/icon'
import Split from '@/components/split'

import Toolbar from './components/Toolbar'
import md from './md'

const prefixCls = 'c-printer'

const IMAGE_EXT_TYPES = ['.gif', '.webp', '.png', '.jpeg', '.jpg']
const IMAGE_MIME_TYPES = ['image/gif', 'image/webp', 'image/png', 'image/jpeg']

export default {
  name: 'Printer',
  components: {
    // Button,
    // Icon,
    Split,
    Toolbar
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
      lines: 30,
      refTextarea: null
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
    insert (insertStr) {
      const { selectionStart: startPos, selectionEnd: endPos } = this.refTextarea
      const oldVal = this.val

      console.log(startPos, endPos)

      this.val = oldVal.substring(0, startPos) + insertStr + oldVal.substring(endPos, oldVal.length)
      this.update()
    },
    handleSave () {
      this.update()
      this.$emit('on-save')
    },
    handleScroll (event, ref) {
      const another = this.$refs[ref]
      const { scrollHeight, scrollTop } = event.target

      console.log(scrollHeight, scrollTop)

      another.scrollTop = another.scrollHeight * (scrollTop / scrollHeight)
    },
    paste (event) {
      console.log(event.clipboardData.types[0])
      const items = event.clipboardData.items
      const item = items.length === 2 ? items[1] : items[0]
      const pasteText = event.clipboardData.getData('text')
      const matchResult = pasteText.match(/(\.\w+)$/)
      const ext = typeOf(matchResult) === 'array' ? matchResult[1] : undefined

      console.log(item.type, item.kind)
      // bug: copy any file would return image/png
      if (IMAGE_MIME_TYPES.includes(item.type) && (!ext || IMAGE_EXT_TYPES.includes(ext))) {
        event.preventDefault()

        const blob = item.getAsFile()

        this.uploadLocalImage(blob, ext)
      }
      // else if (item.type === 'text/plain' &&
      //   /^http|s:\/\/\w+/.test(pasteText) &&
      //   IMAGE_EXT_TYPES.includes(ext)) {
      //   event.preventDefault()

      //   this.uplaodRemoteImage(pasteText)
      // }
    },
    uploadLocalImage (blob, ext) {
      const reader = new FileReader()

      reader.onload = (event) => {
        this.$fetch('common.saveImage', {
          type: 'base64',
          data: event.target.result,
          ext
        }).then((res) => {
          console.log(res)
          this.insert(`![](${res})`)
        }).catch(error => {
          console.error(error)
        })
      }

      reader.readAsDataURL(blob)
    },
    uplaodRemoteImage (url) {
      this.$fetch('common.saveImage', {
        type: 'url',
        data: url
      }).then((res) => {
        console.log(res)
      }).catch(error => {
        console.error(error)
      })
    }
  },
  created () {
    if (this.val !== this.value) {
      this.val = this.value
    }
  },
  mounted () {
    this.refTextarea = this.$refs.textarea
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

.c-printer {
  &__header {
    border: 1px solid var(--border-color);
  }
}
</style>
