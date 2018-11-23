// 创建gulp对象
var gulp = require('gulp');
gulp.task('hello',function(){
	console.log('hello');
});

// 1.复制文件到dist文件夹下
gulp.task('copy-index',function(){
	return gulp.src('index.html')
	.pipe(gulp.dest('dist'))
	.pipe(connect.reload());
});

// 2.复制图片到dist/images文件下
gulp.task('copy-image',function(){
	// 如果拷贝的文件夹内部还有文件夹，以下为便捷写法
	return gulp.src('images/**/*')
	.pipe(gulp.dest('dist/images'))
	.pipe(connect.reload());
});

// 3.拷贝多个文件夹下的内容到同一个文件夹里：dist/data
gulp.task('copy',function(){
	return gulp.src(['xml/*', 'json/*'])
	.pipe(gulp.dest('dist/data'))
	.pipe(connect.reload());
});

// 4.一次性执行多个任务
gulp.task('bulid', ['copy-image','copy','copy-index'] , function(){
	console.log('编译成功');
})

// 5.监听
gulp.task('watch',function(){

/*  第一个参数：检测到的文件路径
	第二个参数：监听到变化后，需要执行的任务
  */
	gulp.watch('index.html',['copy-index']);
	gulp.watch('*.scss', ['scss']);
	gulp.watch(['xml/*', 'json/*'] , ['copy']);
	gulp.watch('images/**/*' , ['copy-image']);
});

// 6.使用插件：gulp-sass-china，编译css文件
var sass = require('gulp-sass-china')
gulp.task('scss',function(){
	return gulp.src('*.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
})

// 7.使用插件：gulp-connect 来启动一个服务器
var connect = require('gulp-connect');
gulp.task('server',function(){
	connect.server({
		root:'dist',
		livereload:true   //实时刷新
	});
})

// 同时启动监听和服务，设置默认任务
gulp.task('default',['watch','server']);


