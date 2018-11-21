// 1、创建gulp对象
var gulp = require('gulp');
gulp.task('hello',function(){
	console.log('hello');
})

// 1.复制文件到dist文件夹下
gulp.task('copy-index',function(){
	return gulp.src('index.html').pipe(gulp.dest('dist'))
})

//2.



// 监听
gulp.task('watch',function(){

/*  第一个参数：检测到的文件路径
	第二个参数：监听到变化后，需要执行的任务
  */
	gulp.watch('index.html',['copy-index']);
})