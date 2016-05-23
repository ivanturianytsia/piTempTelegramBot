var gulp = require('gulp');
var gitWatch = require('gulp-git-watch');

var PythonShell = require('python-shell');
var shell;

gulp.task('default', function() {
    shell = new PythonShell('server.py')
    console.log("Pyhon shell: New started");
    return gitWatch({
            gitPull: ['git', 'pull', 'origin', 'master'],
            forceHead: true
        })
        .on('nochange', function(hash) {
            console.log('Git no change on', hash);
        })
        .on('change', function(newHash, oldHash) {
            console.log('Git CHANGES! FROM', oldHash, '->', newHash);
            if (shell) {
                shell.end(function() {
                    console.log("Pyhon shell: Old ended");
                })
            }
            shell = new PythonShell('server.py')
            console.log("Pyhon shell: New started");
        });
});