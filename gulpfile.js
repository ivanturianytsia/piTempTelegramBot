var gulp = require('gulp');
var gitWatch = require('gulp-git-watch');

var PythonShell = require('python-shell');
var shell;
var startPython = function() {
    shell = new PythonShell('server.py')
    console.log("Pyhon shell: New started");
}
gulp.task('default', function() {
    startPython()
    return gitWatch({
            gitPull: ['git', 'pull', 'origin', 'master'],
            forceHead: true
        })
        .on('change', function(newHash, oldHash) {
            console.log('Git CHANGES! FROM', oldHash, '->', newHash);
            if (shell) {
                shell.end(function() {
                    console.log("Pyhon shell: Old ended");
                    startPython()
                })
            } else {
                startPython()
            }
        });
});