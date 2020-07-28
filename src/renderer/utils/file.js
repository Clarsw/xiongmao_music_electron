var fs = require('fs')
var path = require('path')

// 解析需要遍历的文件夹，我这以E盘根目录为例
function getLocalSongs() {
  // 调用文件遍历方法
  fileDisplay(filePath)
}
var filePath = path.resolve('C:\\Users\\clarsw\\projectmusic')
// var icon_json = {
//   'path': 'font-icon/other/',
//   'templates': []
// }

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
  // 根据文件路径读取文件，返回文件列表
  // console.log('*****************************enter')
  fs.readdir(filePath, function (err, files) {
    // console.log('files22222222222222', files)
    if (err) {
      console.warn(err)
    } else {
      // 遍历读取到的文件列表
      var fileArray = []
      files.forEach(function (filename) {
        console.log('filename', filename)
        var filejson = {
          'src': '',
          'name': '',
          'ar': ''
        }
        filejson.src = filePath + '\\' + filename.substring(1)
        // filejson.type = file.type
        let break1 = filename.indexOf('.')
        let break2 = filename.indexOf('-')
        filejson.name = filename.substring(break2 + 1, break1)
        filejson.ar = filename.substring(0, break2)
        fileArray.push(filejson)
        console.log(fileArray)
        // 获取当前文件的绝对路径
        // var filedir = path.join(filePath, filename)
        // console.log(fileArray, filedir)
        // 根据文件路径获取文件信息，返回一个fs.Stats对象
        // fs.stat(filedir, function (eror, stats) {
        //   if (eror) {
        //     console.warn('获取文件stats失败')
        //   } else {
        //     var isFile = stats.isFile() // 是文件
        //     var isDir = stats.isDirectory() // 是文件夹
        //     if (isFile) {
        //       console.log(filedir)
        //     }
        //     if (isDir) {
        //       fileDisplay(filedir) // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
        //     }
        //   }
        // })
      })
      // icon_json.templates = fileArray
      // console.log('*******fileArray', fileArray)
      // var t = JSON.stringify(icon_json)
      // fs.writeFileSync('file.json', t)
      // console.log('*****************************end')
    }
  })
}
export default getLocalSongs