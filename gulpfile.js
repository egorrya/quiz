"use strict";

var gulp = require("gulp"),
less = require("gulp-less"),
plumber = require("gulp-plumber"),
postcss = require("gulp-postcss"),
uncss = require('gulp-uncss'),
autoprefixer = require("autoprefixer"),
mqpacker = require("css-mqpacker"),
minify = require("gulp-csso"),
rename = require("gulp-rename"),
imagemin = require("gulp-imagemin"),
svgmin = require("gulp-svgmin"),
svgstore = require("gulp-svgstore"),
uglify = require("gulp-uglify"),
server = require("browser-sync"),
run = require("run-sequence"),
del = require("del");


gulp.task("style", function() {
	gulp.src("assets/less/style.less")
	.pipe(plumber())
	.pipe(less())
	.pipe(uncss({
		html: ['index.html', '*.html']
	}))
	.pipe(postcss([
		autoprefixer({browsers: [
			"last 1 version",
			"last 2 Chrome versions",
			"last 2 Firefox versions",
			"last 2 Opera versions",
			"last 2 Edge versions"
			]}),
		mqpacker({
			sort: true
		})
		]))
	.pipe(gulp.dest("assets/css"))
	.pipe(minify())
	.pipe(rename("style.min.css"))
	.pipe(gulp.dest("assets/css"))
	.pipe(server.reload({stream: true}));
});


gulp.task("symbols", function() {
	return gulp.src("assets/img/icons/*.svg")
	.pipe(svgmin({
		plugins: [{
			removeAttrs: {attrs: 'fill'}
		}]
	}))
	.pipe(svgstore({
		inlineSvg: true
	}))
	.pipe(rename("symbols.svg"))
	.pipe(gulp.dest("assets/img"));
});

gulp.task("serve", ["style"], function() {
	server.init({
		server: ".",
		notify: false,
		open: true,
		ui: false
	});

	gulp.watch("assets/less/**/*.less", ["style"]);
	gulp.watch('*.html', function(obj) {
		if (obj.type === 'changed') {
			gulp.src( obj.path, { "base": "."})
			.pipe(gulp.dest('build'))
			.pipe(server.reload({stream: true}));
		}
	});
	gulp.watch('assets/js/**/*.js', function(obj) {
		if (obj.type === 'changed') {
			gulp.src( obj.path, { "base": "."})
			.pipe(gulp.dest('build'))
			.pipe(server.reload({stream: true}));
		}
	});
});

gulp.task("build", function(fn) {
	run("style", "images", "symbols", fn)
});

gulp.task("copy", function() {
	gulp.src([
		"assets/css/style.min.css",
		"assets/fonts/**/*.{woff,woff2}",
		"assets/img/*.{jpg,png,svg,gif}",
		"assets/js/*.js",
		"*.html"
		], {
			base: "."
		})
	.pipe(gulp.dest("build"));
});

gulp.task('jsmin', function() {
  return gulp.src([
    "assets/js/common.js"
    ])
    .pipe(gulp.dest("assets/js")) 
    .pipe(uglify())
    .pipe(rename({suffix: '.min'})) 
    .pipe(gulp.dest('assets/js'))
    .pipe(server.reload({stream: true}));
});

gulp.task("clean", function () { 
  return del("build");
});

gulp.task("build", function(fn) {
	run(
		"clean",
		"style",
		"jsmin",
		"symbols",
		"copy",
		fn
		);
});
