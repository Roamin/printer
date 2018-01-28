const Koa = require('koa');
const path = require('path');
const convert = require('koa-convert');
const static = require('koa-static');
const {uploadFile} = require('./util/upload');

const app = new Koa();

app.use(static(
	path.join(__dirname, '../')
));

/**
 * 使用第三方中间件 end
 */

app.use(async (ctx) => {
	if (ctx.method === 'GET') {
		let title = 'upload pic async';

		await ctx.render('index', {
			title,
		});
	} else if (ctx.url === '/api/upload' && ctx.method === 'POST') {
		// 上传文件请求处理
		let result = {success: false};
		let serverFilePath = path.join(__dirname, '../cdn/img');

		// 上传文件事件
		result = await uploadFile(ctx, {
			fileType: 'album',
			path: serverFilePath
		});

		ctx.body = result;
	} else {
		// 其他请求显示404
		ctx.body = '<h1>404！！！ o(╯□╰)o</h1>';
	}

});

app.listen(8080, () => {
	console.log('demo request post is starting at port 8080')
});