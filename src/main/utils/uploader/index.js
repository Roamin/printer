import { Notification } from 'electron'
import path from 'path'
import dayjs from 'dayjs'

const PicGo = require('picgo')
const CONFIG_PATH = path.join(__dirname, 'config.json')

class Uploader {
  constructor (imageList, webContents, picgo = undefined) {
    this.imageList = imageList
    this.webContents = webContents
    this.picgo = picgo
  }

  upload () {
    const picgo = this.picgo || new PicGo(CONFIG_PATH)

    picgo.config.debug = true
    // for picgo-core
    picgo.config.PICGO_ENV = 'GUI'

    picgo.helper.beforeUploadPlugins.register('renameFn', {
      handle: async ctx => {
        const autoRename = picgo.getConfig('settings.autoRename')

        await Promise.all(
          ctx.output.map(async (item, index) => {
            let name
            let fileName

            if (autoRename) {
              fileName =
                dayjs()
                  .add(index, 'second')
                  .format('YYYYMMDDHHmmss') + item.extname
            } else {
              fileName = item.fileName
            }

            item.fileName = name || fileName
          })
        )
      }
    })

    picgo.helper.beforeTransformPlugins.register('renameFn', {
      handle: async ctx => {
        const autoRename = picgo.getConfig('settings.autoRename')

        await Promise.all(
          ctx.output.map(async (item, index) => {
            let name
            let fileName

            if (autoRename) {
              fileName =
                dayjs()
                  .add(index, 'second')
                  .format('YYYYMMDDHHmmss') + item.extname
            } else {
              fileName = item.fileName
            }

            item.fileName = name || fileName
          })
        )
      }
    })

    picgo.on('beforeTransform', ctx => {
      if (ctx.getConfig('settings.uploadNotification')) {
        const notification = new Notification({
          title: '上传进度',
          body: '正在上传'
        })

        notification.show()
      }
    })

    picgo.upload(this.imageList)

    picgo.on('notification', message => {
      const notification = new Notification(message)

      notification.show()
    })

    picgo.on('uploadProgress', progress => {
      this.webContents.send('uploadImageProgress', progress)
    })

    return new Promise((resolve, reject) => {
      picgo.on('finished', ctx => {
        if (ctx.output.every(item => item.imgUrl)) {
          resolve(ctx.output)
        } else {
          reject(new Error('Upload failed.'))
        }
      })
      picgo.on('failed', ctx => {
        const notification = new Notification({
          title: '上传失败',
          body: '请检查配置和上传的文件是否符合要求'
        })

        notification.show()

        reject(new Error('Upload failed.'))
      })
    })
  }
}

export default Uploader
