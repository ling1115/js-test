var gulp = require('gulp');
var scss = require('gulp-sass-china');
var connect = require('gulp-connect');

//拷贝html文件
gulp.task('copy-html' , function(){
	return gulp.src('*.html')
	.pipe(gulp.dest('dist'))
	.pipe(connect.reload());
})

// 拷贝所有js文件
gulp.task('copy-js' , function(){
	return gulp.src('js/*.js')
	.pipe(gulp.dest('dist/js'))
	.pipe(connect.reload());
})

// 拷贝images
gulp.task('copy-image' , function(){
	return gulp.src('images/**/*')
	.pipe(gulp.dest('dist/images'))
	.pipe(connect.reload());
})

// scss转CSS并拷贝
gulp.task('copy-scss' , function(){
	return gulp.src('scss/*.scss')
	.pipe(scss())
	.pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
})

//一次执行多次任务
gulp.task('build' , ['copy-html' , 'copy-js' , 'copy-image' , 'copy-scss'] , function(){
	console.log('编译成功');
})

// 启动监听
gulp.task('watch' , function(){
	gulp.watch('*.html' , ['copy-html']);
	gulp.watch('js/*.js' , ['copy-js']);
	gulp.watch('images/**/*' , ['copy-image']);
	gulp.watch('scss/*.scss' , ['scss']);
})

//启动服务器
gulp.task('server' , function(){
	connect.server({
		root:'dist',
		livereload:true
	})
})

// 设置默认执行任务
gulp.task("default" ,['watch' , 'server'] )
