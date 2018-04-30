var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pug = require('gulp-pug');
var beautify = require('gulp-html-beautify');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();
var sitemap = require('gulp-sitemap');
var save = require('gulp-save');
var robots = require('gulp-robots');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
    ' */\n',
    ''
].join('');
// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function () {
    // Bootstrap
    gulp.src([
        './node_modules/bootstrap/dist/**/*',
        '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
        '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
        .pipe(gulp.dest('./assets/vendor/bootstrap'));
    // ChartJS
    gulp.src([
        './node_modules/chart.js/dist/*.js'
    ])
        .pipe(gulp.dest('./assets/vendor/chart.js'));
    // DataTables
    gulp.src([
        './node_modules/datatables.net/js/*.js',
        './node_modules/datatables.net-bs4/js/*.js',
        './node_modules/datatables.net-bs4/css/*.css'
    ])
        .pipe(gulp.dest('./assets/vendor/datatables/'));
    // Font Awesome
    gulp.src([
        './node_modules/font-awesome/**/*',
        '!./node_modules/font-awesome/{less,less/*}',
        '!./node_modules/font-awesome/{scss,scss/*}',
        '!./node_modules/font-awesome/.*',
        '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
        .pipe(gulp.dest('./assets/vendor/font-awesome'));
    // jQuery
    gulp.src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
    ])
        .pipe(gulp.dest('./assets/vendor/jquery'));
    // jQuery Easing
    gulp.src([
        './node_modules/jquery.easing/*.js'
    ])
        .pipe(gulp.dest('./assets/vendor/jquery-easing'))
});
// Compile SCSS
gulp.task('css:compile', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./assets/css'))
});
// Minify CSS
gulp.task('css:minify', ['css:compile'], function () {
    return gulp.src([
        './assets/css/*.css',
        '!./assets/css/*.min.css'
    ])
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.stream());
});
// CSS
gulp.task('css', ['css:compile', 'css:minify']);
// Minify JavaScript
gulp.task('js:minify', function () {
    return gulp.src([
        './assets/js/*.js',
        '!./assets/js/*.min.js'
    ])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./assets/js'))
        .pipe(browserSync.stream());
});
// JS
gulp.task('js', ['js:minify']);
// PUG
gulp.task('pug', function buildHTML() {
    return gulp.src('./src/pug/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
// Default task
gulp.task('default', ['css', 'js', 'vendor']);
// Configure the browserSync task
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
// Dev task
gulp.task('dev', ['css', 'js', 'pug', 'browserSync'], function () {
    gulp.watch('./src/pug/**/*', ['pug']);
    gulp.watch('./src/scss/**/*.scss', ['css']);
    gulp.watch('./assets/js/*.js', ['js']);
    gulp.watch('./*.html', browserSync.reload);
});


gulp.task('watch', ['css', 'pug'], function () {
    gulp.watch('./src/pug/**/*', ['pug']);
    gulp.watch('./src/scss/**/*.scss', ['css']);
});


//sitemap.xml generator --------------------------------------------------------------
gulp.task('sitemap', function () {
    gulp.src('*.html', {
        read: false
    })
        .pipe(save('before-sitemap'))
        .pipe(sitemap({
            siteUrl: 'http://fina.bi/',
            mappings: [{
                pages: ['clients.html', 'partners.html'],
                changefreq: 'hourly',
                priority: 0.5
            }, {
                pages: ['contact.html'],
                changefreq: 'always'
            }
            ]
        }))
        .pipe(gulp.dest('./'))
        .pipe(save.restore('before-sitemap'));
});

// robot.txt generator --------------------------------------------------------------
gulp.task('robot', function () {
    gulp.src('./*.html')
        .pipe(robots({
            useragent: '*',
            allow: ['./'],
            disallow: ['cgi-bin/'],
            sitemap: 'sitemap.xml'
        }))
        .pipe(gulp.dest('./'));
});


gulp.task('material', function () {
    gulp.src('./assets/scss/material-kit.scss').pipe(sass()).pipe(gulp.dest('./'));
});














