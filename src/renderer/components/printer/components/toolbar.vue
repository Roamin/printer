<template>
  <div class="toolbar">
    <div class="left">
      <Tooltip content="Upload image">
        <Button
          class="button"
          size="small"
          icon="image"
          @click.native="showModal('upload')"
        />
      </Tooltip>
      <Tooltip content="Insert table">
        <Button
          class="button"
          size="small"
          icon="table"
          @click.native="showModal('table')"
        />
      </Tooltip>
      <Tooltip content="Undo">
        <Button class="button" size="small" icon="undo" />
      </Tooltip>
      <Tooltip content="Redo">
        <Button class="button" size="small" icon="redo" />
      </Tooltip>
    </div>

    <div class="right">
      <Button class="button" size="small" icon="help-circle" />
      <Button class="button" size="small" icon="layout" />
      <Button class="button" size="small" icon="save" />
    </div>

    <Modal v-model="upload.visible">
      <template slot="header">
        <div>Upload image</div>
      </template>
      <Upload multiple @on-success="insertImages" />
    </Modal>

    <Modal @on-confirm="insertTable" v-model="table.visible">
      <template slot="header">
        <div>Insert Table</div>
      </template>
      <Button @click.native="addRow">Add Row</Button>
      <Button @click.native="addColumn">Add Column</Button>
      <div class="table-wrapper" style="overflow: auto; padding: 5px">
        <table>
          <tr v-for="(row, rowIndex) in table.form.model.data" :key="rowIndex">
            <component
              :is="rowIndex === 0 ? 'th' : 'td'"
              v-for="(column, columnIndex) in table.form.model.data[rowIndex]"
              :key="columnIndex"
              ><Input
                :placeholder="rowIndex === 0 ? `Title${columnIndex + 1}` : ''"
                v-model="table.form.model.data[rowIndex][columnIndex]"
            /></component>
          </tr>
        </table>
      </div>
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
  name: 'Toolbar',
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
        visible: false,
        form: {
          model: {
            columns: 2,
            rows: 2,
            data: [
              ['', ''],
              ['', '']
            ]
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
    addRow () {
      ++this.table.form.model.rows

      this.table.form.model.data.push(
        Array.from({ length: this.table.form.model.columns }, () => '')
      )
    },
    addColumn () {
      ++this.table.form.model.columns

      this.table.form.model.data = this.table.form.model.data.map((row) => {
        row.push('')

        return row
      })
    },
    insertTable () {
      const ths = this.table.form.model.data[0]
      const tds = this.table.form.model.data.splice(1).map((tr) => {
        return `| ${tr.join(' | ')} |`
      })
      this.insert(`
| ${ths.join(' | ')} |
|${':-:|'.repeat(ths.length)}
${tds.join('\n')}
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
table {
  font-size: 1rem;
  width: auto;
  max-width: 100%;
  overflow: auto;
  border-spacing: 0;
  border: 1px solid var(--border-color);
  border-right: none;
  border-bottom: none;

  th {
    background: #f6f6f6;
    color: #000;
  }

  tr:nth-child(2n) {
    background-color: #fcfcfc;
  }

  td,
  th {
    padding: 5px;
    border-right: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
  }

  td {
    min-width: 10rem;
  }
}
</style>
