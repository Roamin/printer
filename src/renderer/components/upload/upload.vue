<template>
  <div :class="classnames"
       @drop.prevent="dropHandle"
       @dragover.prevent="dragoverHandle"
       @dragleave.prevent="dragleaveHandle">
    <input :class="`${prefixCls}__file-input`"
           type="file"
           :accept="accept"
           :multiple="multiple"
           @change="upload">
    <Icon type="upload"
          size="32px" />
    <div :class="`${prefixCls}__tips`">点击或拖拽上传</div>
  </div>
</template>

<script>
import Button from '../button'
import Icon from '../icon'

import fetch from '../../utils/fetch'

const prefixCls = 'c-upload'

export default {
  name: 'Upload',
  components: {
    Button,
    Icon
  },
  props: {
    accept: {
      type: String,
      default: '.gif,.webp,.png,.jpeg,.jpg'
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      prefixCls,
      dragover: false,
      val: []
    }
  },
  computed: {
    classnames () {
      return [
        `${prefixCls}`,
        {
          'drop-in': this.dragover
        }
      ]
    }
  },
  methods: {
    dropHandle (e) {
      this.dragover = false

      this.uploadImages(e.dataTransfer.files)
    },
    dragoverHandle () {
      this.dragover = true
    },
    dragleaveHandle () {
      this.dragover = false
    },
    uploadImages (files) {
      const images = Array.from(files).map(({ name, path }) => {
        return { filename: name, filePath: path }
      })
      const result = []
      let count = images.length

      images.forEach((image) => {
        fetch('common.uploadImage', image).then((filePath) => {
          count--
          result.push(filePath)

          if (count === 0) {
            this.$emit('on-success', result)
          }
        })
      })
    },
    upload (event) {
      this.uploadImages(event.target.files)
    }
  }
}
</script>
