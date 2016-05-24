var gulp = require('gulp');
var gitWatch = require('gulp-git-watch');
var PythonShell = require('python-shell');

var shell;
var startPython = function() {
    console.log("[Pyhon shell]: starting new...");
    shell = new PythonShell('server.py')
    console.log("[Pyhon shell]: new started");
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
                console.log("[Pyhon shell]: ending old...");
                shell.end(function(err) {
                    if (err) {
                        console.log("[Pyhon shell]:" + err)
                    } else {
                        console.log("[Pyhon shell]: old ended");
                        startPython()
                    }
                })
            } else {
                startPython()
            }
        });
});