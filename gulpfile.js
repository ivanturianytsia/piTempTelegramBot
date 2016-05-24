var gulp = require('gulp');
var gitWatch = require('gulp-git-watch');
var PythonShell = require('python-shell');

var shell;
var startPython = function() {
    console.log("\t[Pyhon shell]: starting new...");
    shell = PythonShell.run('server.py');
    console.log("\t[Pyhon shell]: new started.");
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
                console.log("\t[Pyhon shell]: ending old...");
                shell.end(function(err) {
                    if (err) {
                        console.log("\t[Pyhon shell]: " + err)
                    } else {
                        console.log("\t[Pyhon shell]: old ended.");
                        startPython()
                    }
                })
            } else {
                startPython()
            }
        });
});