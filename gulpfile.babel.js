import gulp from "gulp";
import del from "del";
import server from "gulp-webserver";
import gpug from "gulp-pug";
import scss from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minify from "gulp-csso";
import browserify from "gulp-bro";
import babelify from "babelify";
import image from "gulp-image";

scss.comiler = require("node-sass");

const routes = {
    pug: {
        watch: "src/**/*.pug",
        src: "src/*.pug",
        dest: "dist",
    },
    scss: {
        watch: "src/scss/**/*.scss",
        src: "src/scss/style.scss",
        dest: "dist/css",
    },
    js: {
        watch: "src/js/**/*.js",
        src: "src/js/main.js",
        dest: "dist/js",
    },
    img: {
        src: "src/img/**",
        dest: "dist/img",
    },
};

const clean = () => del(["dist"]);

const webServer = () =>
    gulp.src("dist").pipe(server({ livereload: true, open: true }));

const pug = () =>
    gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const style = () =>
    gulp
        .src(routes.scss.src)
        .pipe(scss().on("error", scss.logError))
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(gulp.dest(routes.scss.dest));

const js = () =>
    gulp
        .src(routes.js.src)
        .pipe(
            browserify({
                transform: [
                    babelify.configure({ presets: ["@babel/preset-env"] }),
                    ["uglifyify", { global: true }],
                ],
            })
        )
        .pipe(gulp.dest(routes.js.dest));

const liveReload = () => {
    gulp.watch(routes.pug.watch, pug);
    gulp.watch(routes.scss.watch, style);
    gulp.watch(routes.js.watch, js);
};

const prepare = gulp.series([clean]);
const assets = gulp.series([pug, style, js]);
const live = gulp.parallel([webServer, liveReload]);

export const dev = gulp.series([prepare, assets, live]);
