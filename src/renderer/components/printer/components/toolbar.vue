<template>
  <div class="toolbar">
    <div class="left">
      <Button class="button"
              size="small"
              icon="image"
              @click.native="showUpload" />
      <Button class="button"
              size="small"
              icon="table" />
      <Button class="button"
              size="small"
              icon="undo" />
      <Button class="button"
              size="small"
              icon="redo" />
    </div>

    <div class="right">
      <Button class="button"
              size="small"
              icon="help-circle" />
      <Button class="button"
              size="small"
              icon="layout" />
      <Button class="button"
              size="small"
              icon="save" />
    </div>

    <Modal v-model="upload.visible">
      <template slot="header">
        <div>hhh</div>
      </template>
      <Upload />
    </Modal>
  </div>
</template>

<script>
import Button from '../../button'
import Icon from '../../icon'
import Modal from '../../modal'
import Upload from '../../upload'

export default {
  name: 'Printer',
  components: {
    Button,
    Icon,
    Modal,
    Upload
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      upload: {
        visible: false
      }
    }
  },
  methods: {
    insert (val) {
      this.$emit('insert', val)
    },
    showUpload () {
      this.upload.visible = true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>