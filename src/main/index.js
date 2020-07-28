'use strict'
/* eslint-disable */
var electron = require('electron')
import {
  app,
  ipcMain,
  BrowserWindow
} from 'electron'
import {
  Store
} from 'vuex'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    useContentSize: true,
    width: 1200,
    frame: false,
    resizable: false,
    skipTaskbar: false,
    transparent: false,
    title: '熊猫云音乐',
    autoHideMenuBar: true,
    //跨域
    webPreferences: {
      webSecurity: false,
      //...
    },
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

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

/**
 * ipmcMain 主线程
 */
ipcMain.on('close', function (event, arg) {
  mainWindow.close()
})

ipcMain.on('minimize', function (event, arg) {
  mainWindow.minimize()
})
ipcMain.on('max', function (event, arg) {
  mainWindow.maximize()
})
ipcMain.on('min', function (event, arg) {
  mainWindow.restore()
})
//桌面歌词
let newwin
ipcMain.on('showlyric', function (event, arg) {
  // Menu.setApplicationMenu(null) // 关闭子窗口菜单栏
  var winW = electron.screen.getPrimaryDisplay().workAreaSize.width;
  var winH = electron.screen.getPrimaryDisplay().workAreaSize.height;
  const modalPath = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080#/lyric` :
    `file://${__dirname}/index.html#/lyric`
  newwin = new BrowserWindow({
    width: winW - 200,
    height: 60,
    frame: false,
    x: 100,
    y: winH - 80,
    center: true,
    useContentSize: true,
    resizable: false,
    skipTaskbar: true,
    transparent: true,
    autoHideMenuBar: true,
    movable: true,
    // opacity: 0,
    // minimizable: false,
    // backgroundColor: transparent,
    transparent: true,
    // backgroundColor: '#FF0000',
    webPreferences: {
      webSecurity: false
    },
    parent: mainWindow, //win是主窗口
    title: '歌词',
  })
  newwin.loadURL(modalPath); //new.html是新开窗口的渲染进程
  newwin.on('closed', () => {
    newwin = null
  })

})
ipcMain.on('closelyric', function (event, arg) {
  newwin.close()
})
ipcMain.on('updatestate', (event, message) => {
  if (newwin) {
    newwin.webContents.send('updatelyric', message);
  }
});




/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
    import { autoUpdater } from 'electron-updater'

    autoUpdater.on('update-downloaded', () => {
      autoUpdater.quitAndInstall()
    })

    app.on('ready', () => {
      if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
    })
     */