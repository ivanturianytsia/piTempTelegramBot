var gulp = require('gulp');
var gitWatch = require('gulp-git-watch');
var PythonShell = require('python-shell');

var shell;
var startPython = function() {
    console.log("\t[Pyhon shell]: starting new...");
    shell = PythonShell.run('server.py', {}, function() {
        console.log("\t[Pyhon shell]: new started!");
    });
}
gulp.task('default', function() {
    startPython()
    return gitWatch({
            gitPull: ['git', 'pull', 'origin', 'master'],
            forceHead: true
        })
        .on('change', function(newHash, oldHash) {
            console.log('Git CHANGES! FROM', oldHash, '->', newHash);
            startPython()
        });
});