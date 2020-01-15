var gulp = require("gulp"),
connect = require("gulp-connect"),
concat = require("gulp-concat"),
proxy = require('http-proxy-middleware'),
uglify = require('gulp-uglify'),
rename= require('gulp-rename'),
livereload = require('gulp-livereload');
// 启动本地服务
gulp.task("connect",function(){
connect.server({
    root:"./",
    host:"localhost",
    port:8080,
    livereload:true,
    middleware: function(connect, opt) {
         return [
            proxy(["/api"], {
                //target: 'http://clath.dev.idaqi.com',
                target: 'http://121.40.185.94:8111',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            })
        ]
     }
});
});
// 合并文件全局脚本文件
gulp.task("concat",function(){
gulp.src([
    "./asset/js/lib/jquery-1.11.3.min.js",
    "./asset/js/lib/art-template.js",
    "./asset/js/lib/ajaxupload.3.9.js",
    "./asset/js/lib/jquery.icheck.min.js",
    "./asset/js/lib/bootstrap.js"
    ])
.pipe(concat("vendor.js"))
.pipe(uglify())
// .pipe(rename(function(path){
// 	path.basename += ".min";
// 	path.extname = ".js";
// }))
.pipe(gulp.dest("./build/js"));
});

gulp.task("watch",function(){
gulp.watch(["views/*.html"],["reload"]);
gulp.watch(["./asset/js/page/**/*.js"],["es6"])
});
gulp.task("reload",function(){
gulp.src("views/*.html").pipe(connect.reload());
});
gulp.task("web",["connect","watch"]);