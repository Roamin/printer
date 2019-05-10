const glob = require('glob')
const path = require('path')
const isDev = require('electron-is-dev')
const { app, BrowserWindow } = require('electron')

const debug = /--debug/.test(process.argv[2])

if (process.mas) app.setName('Electron APIs')

let mainWindow = null

function initialize() {
  makeSingleInstance()

  loadProcess()

  console.log(app.getLocale())

  function createWindow() {
    const windowOptions = {
      width: 1080,
      minWidth: 680,
      height: 720,
      title: app.getName(),
      titleBarStyle: 'hidden',
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, '/app/public/renderer.js') // 预加载的 js 文件内仍可以使用 Nodejs 的 API
      }
    }

    mainWindow = new BrowserWindow(windowOptions)

    if (isDev) {
      mainWindow.loadURL('http://localhost:3000/')
    } else {
      mainWindow.loadURL(
        path.join('file://', __dirname, '/app/build/index.html')
      )
    }

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      mainWindow.webContents.openDevTools()
      mainWindow.maximize()
      require('devtron').install()
    }

    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }

  app.on('ready', () => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

// Require each JS file in the main-process dir
function loadProcess() {
  const files = glob.sync(path.join(__dirname, 'client/controller/*.js'))

  files.forEach(file => {
    require(file)
  })
}

initialize()
