const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')

/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync (dirname) {
	if (fs.existsSync(dirname)) {
		return true
	} else {
		if (mkdirsSync(path.dirname(dirname))) {
			fs.mkdirSync(dirname)
			return true
		}
	}
}

/**
 * 获取上传文件 hash
 * @return {string}          16位 hash
 */
function getHashName () {
    return Math.random().toString(16).substr(2)
}

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}
 */
function uploadFile (ctx, options) {
	let req = ctx.req
	let res = ctx.res
	let busboy = new Busboy({headers: req.headers})

	// 获取类型
	let fileType = options.fileType || 'common'
	let filePath = options.path
	let mkdirResult = mkdirsSync(filePath)

	return new Promise((resolve, reject) => {
		console.log('文件上传中...')
	let result = {
		success: false,
		message: '',
		data: null
	}

	// 解析请求文件事件
	busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
		let fileName = getHashName() + path.extname(filename)
		let savePath = path.join(filePath, fileName)

		// 文件保存到制定路径
		file.pipe(fs.createWriteStream(savePath))

		// 文件写入事件结束
		file.on('end', function () {
			result.success = true
			result.message = '文件上传成功'
			result.data = {
				pictureUrl: `/cdn/img/${ fileName }`
			}
			console.log('文件上传成功！')
			resolve(result)
		})
	})

	// 解析结束事件
	busboy.on('finish', function () {
		console.log('文件上结束')
		resolve(result)
	})

	// 解析错误事件
	busboy.on('error', function (err) {
		console.log('文件上出错')
		reject(result)
	})

	req.pipe(busboy)
})

}

module.exports = {
	uploadFile
}