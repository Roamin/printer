<template>
  <div :class="classnames"
       @drop.prevent="dropHandle"
       @dragover.prevent="dragoverHandle"
       @dragleave.prevent="dragleaveHandle">
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
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      prefixCls,
      dragover: false
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
      const sendFiles = Array.from(files).map(({ name, path }) => {
        return { name, path }
      })

      console.log(JSON.stringify(sendFiles, null, 4))

      fetch('common.uploadImage', sendFiles).then((res) => {
        console.log(JSON.stringify(res, null, 4))
      })
    }
  }
}
</script>
