const gitclone = require('git-clone');
const ora = require('ora');

module.exports = function(url, dest) {
    return new Promise((resolve, reject) => {
        const spinner = ora('downloading...');
        spinner.start();
        gitclone(url, dest, {}, err => {
            spinner.stop();
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};