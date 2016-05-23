var gulp = require('gulp');
var gitWatch = require('gulp-git-watch');

var PythonShell = require('python-shell');
var shell;

gulp.task('default', function() {
    return gitWatch({
            gitPull: ['git', 'pull', 'origin', 'master'],
            forceHead: true
        })
        .on('change', function(newHash, oldHash) {
            console.log('Git CHANGES! FROM', oldHash, '->', newHash);
            if (shell) {
                shell.end(function() {
                    console.log("ended");
                })
            }
            shell = new PythonShell('server.py')
        });
});