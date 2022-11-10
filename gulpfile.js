
const gulp = require("gulp");
const inject = require('gulp-inject');

gulp.task('linksInject', async function (done) {
  gulp.src('./index.html', { allowEmpty: true })
    .pipe(inject(
      gulp.src(['./animations/**/*.html'], { read: false, allowEmpty: true }), {
      transform: function (filepath) {
        if (filepath.slice(-5) === '.html') {
          let splittedString = filepath.split('/');
          if (splittedString.length > 1 && splittedString[2]) {
            let titledString = splittedString[2].replace(/-/g, ' ');
            titledString = titledString.charAt(0).toUpperCase() + titledString.slice(1)
            return '<li><a href="' + filepath.substring(1) + '">' + titledString + '</a></li>';
          } else {
            return '<li><a href="' + filepath.substring(1) + '">' + filepath + '</a></li>';
          }
        }
        // Use the default transform as fallback:
        return inject.transform.apply(inject.transform, arguments);
      }
    }
    ))
    .pipe(gulp.dest('./'));
  done();
});