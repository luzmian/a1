


//var gulp = require("gulp");
//gulp.src("src/html/*")
//	.pipe(gulp.dest("dset/html"));

//gulp.task("one",function(){
//	console.log("one");
//});

var obj = {
	removeComments: true, //清除HTML注释
	collapseWhitespace: true, //压缩HTML
	collapseBooleanAttributes: true,//省略布尔属性的值<input checked="true"/> ==> <input checked/>
	removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
	removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
	removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
	minifyJS: true, //压缩页面JS
	minifyCSS: true //压缩页面CSS
}


var gulp =require("gulp");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");

//html
gulp.task("htmlTask",function(){
	gulp.src("src/html/*")
		.pipe(htmlmin(obj))
		.pipe(gulp.dest("dest/html"));
});

//js
gulp.task("jsTask",function(){
	gulp.src("src/js/base.js")
		.pipe(uglify())
		.pipe(gulp.dest("dest/js"))
})

//css
gulp.task("cssTask",function(){
	gulp.src("src/css/*")
		.pipe(minifyCss())
		.pipe(gulp.dest("dest/css"))
})





//gulp.task("default",["htmlTask"]);

gulp.task("default",["jsTask"]);




