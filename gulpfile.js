const {src, dest, watch, parallel} = require('gulp');
// let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
let rename = require("gulp-rename");
let robots = require('gulp-robots');
let concat = require('gulp-concat');
let pug = require('gulp-pug');
let sitemap = require('gulp-sitemap');
let save = require('gulp-save');
let uglify = require('gulp-uglify');
let browserSync = require('browser-sync').create();
let minifyCSS = require('gulp-csso');

function html() {
    return src('./src/pug/*.pug')
        .pipe(pug())
        .pipe(dest('./'))
}

function vacancyHtml() {
    return src('./src/pug/vacancies/*.pug')
        .pipe(pug())
        .pipe(dest('./'))
}

function css() {
    return src('./src/scss/**/*.scss')
        // .pipe(sass())
        .pipe(dest('./assets/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCSS())
        .pipe(dest('./assets/css'))
}

function js() {
    return src(['./assets/js/*.js', '!./assets/js/*.min.js'])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('./assets/js'))
}

function material(){
    // return src('./assets/scss/material-kit.scss').pipe(sass()).pipe(dest('./'));
}

function robot() {
    return src('./*.html')
        .pipe(robots({
            useragent: '*',
            allow: ['./'],
            disallow: ['cgi-bin/'],
            sitemap: 'sitemap.xml'
        }))
        .pipe(dest('./'));
}

function sitemapInit() {
    return src('*.html', {
        read: false
    }).pipe(save('before-sitemap'))
        .pipe(sitemap({
            siteUrl: 'https://fina2.net',
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
        .pipe(dest('./'))
        .pipe(save.restore('before-sitemap'));
}

exports.js = js;
exports.css = css;
exports.html = parallel(html, vacancyHtml);
exports.material = material;
exports.robot = robot;
exports.sitemapInit = sitemapInit;
exports.buildAll = parallel(html, vacancyHtml, js);
exports.default = function () {
    watch('./src/pug/**/*', html);
    // watch('./src/scss/**/*.scss', css);
};








