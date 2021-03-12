import gulp from "gulp";
import del from "del";
import server from "gulp-webserver";
import pug from "gulp-pug";
import scss from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minify from "gulp-csso";
import babelify from "babelify";
import uglify from "uglifyify";

scss.comiler = require("node-sass");

const routes = {
    js: {},
    scss: {},
    pug: {},
    img: {},
};

export const dev = gulp.series([prepare, assets, live]);
