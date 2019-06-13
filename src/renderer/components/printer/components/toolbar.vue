<template>
  <div class="toolbar">
    <div class="left">
      <Tooltip content="Upload image">
        <Button class="button"
                size="small"
                icon="image"
                @click.native="showModal('upload')" />
      </Tooltip>
      <Tooltip content="Insert table">
        <Button class="button"
                size="small"
                icon="table"
                @click.native="showModal('table')" />
      </Tooltip>
      <Tooltip content="Undo">
        <Button class="button"
                size="small"
                icon="undo" />
      </Tooltip>
      <Tooltip content="Redo">
        <Button class="button"
                size="small"
                icon="redo" />
      </Tooltip>
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

    <Modal mask-closable
           v-model="upload.visible">
      <template slot="header">
        <div>Upload image</div>
      </template>
      <Upload multiple
              @on-success="insertImages" />
    </Modal>

    <Modal mask-closable
           @on-confirm="insertTable"
           v-model="table.visible">
      <template slot="header">
        <div>Insert Table</div>
        <div>行：<Input type="text"
                 v-model="table.form.model.rows" /></div>
        <div>列：<Input type="text"
                 v-model="table.form.model.columns" /></div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Button from '../../button'
import Icon from '../../icon'
import Input from '../../input'
import Modal from '../../modal'
import Tooltip from '../../tooltip'
import Upload from '../../upload'

export default {
  name: 'Printer',
  components: {
    Button,
    Icon,
    Input,
    Modal,
    Tooltip,
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
      },
      table: {
        visible: true,
        form: {
          model: {
            columns: 3,
            rows: 3
          }
        }
      }
    }
  },
  methods: {
    insert (val) {
      this.$emit('on-insert', val)
    },
    insertImages (images = []) {
      const strList = []

      images.forEach(filePath => {
        strList.push(`![](${filePath})`)
      })

      this.insert(strList.join('\n'))
      this.hideModal('upload')
    },
    insertTable () {
      this.insert(`
| Title1 | Title2 | Title3 |
|:-:|:-:|:-:|
| A | B | C |
| D | E | F |
| G | H | I |
      `)
    },
    hideModal (modalName) {
      this[modalName].visible = false
    },
    showModal (modalName) {
      this[modalName].visible = true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>