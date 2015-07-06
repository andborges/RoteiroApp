var gulp = require('gulp'),
    install = require("gulp-install"),
    child_process = require('child_process'),
    nodemon = require('gulp-nodemon'),
    open = require('gulp-open');

gulp.task('install', function() {
  gulp.src(['./bower.json', './package.json']).pipe(install());
});

gulp.task('mongo', function() {
  gulp.src('').pipe(gulp.dest('data/mongodb'));

  child_process.exec("start c:/mongodb/bin/mongod --dbpath ./data/mongodb", function(err, stdout, stderr) {
  	console.log(stdout);
  });

  child_process.exec("start c:/mongodb/bin/mongo", function(err, stdout, stderr) {
  	console.log(stdout);
  });
})

gulp.task('initdata', function() {
  child_process.exec("start c:/mongodb/bin/mongo localhost:27017/roteiro ./data/seed.js", function(err, stdout, stderr) {
    console.log(stdout);
  });
});

gulp.task('default', function() {
  nodemon({ script: './bin/www' });

  gulp.src('./routes/index.js').pipe(open('', { url: 'http://localhost:3000' }));
});