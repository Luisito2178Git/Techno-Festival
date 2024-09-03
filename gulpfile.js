import {src, dest, watch, series} from 'gulp' //src nos permite acceder a ciertos archivos y dest en donde se almacenaran los archivos utilizados (series te permite ejecutar multiples tareas)
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

// el export permite ejecutar para mandarlo en el package.js

const sass = gulpSass(dartSass)

export function js(done){
    src('src/js/app.js')
        .pipe(dest('build/js'))
    done()
}

export function css(done){
    src('src/scss/app.scss', {sourcemaps:true}) // Esto ubica el archivo
        .pipe(sass().on('error', sass.logError))// Una vez que encuentra el archivo ejecuta el archivo
        .pipe(dest('build/css', {sourcemaps:true}))// donde lo guarda
    done();
}

export function dev(){
    watch('src/scss/**/*.scss', css) // Lee los cambios de todos los archivos que tengan la extencion .scss
    watch('src/js/**/*.js', js) // Lee los cambios de todos los archivos que tengan la extencion .js
}

export default series(js,css,dev) // series arranca una tarea y cuando finaliza se va a la siguiente de esta forma estamos haciendo las 3 tareas
// export default parallel(js,css,dev) // inicia todas las tareas a la vez 