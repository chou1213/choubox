const path = require('path');
const ora = require('ora');
const rm = require('rimraf').sync;
const gitclone = require('git-clone');
module.exports = function() {
    const spinner = ora('downloading webpack4-5 config...');
    spinner.start();
    gitclone('https://github.com/chou1213/webpack4-h5', './', {}, err => {
        spinner.stop();
        if (err) {
            console.log(err);
            return false;
        }
        rm('.git');
        //todo say something
        console.log('init webpack4-h5!');
    });

};