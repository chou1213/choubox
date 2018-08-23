const path = require('path');
const rm = require('rimraf').sync;
const cfs = require('../utils/createFile');
const clone = require('../utils/cloneGithub');
const chalk = require('chalk');

module.exports = function(dir, cmd) {
    const paths = path.resolve(process.cwd(), `./${dir}`);
    cfs(paths).then(() => {
        clone('https://github.com/chou1213/webpack4-h5', paths).then(() => {
            rm(path.resolve(paths, './git'));
            console.log(chalk.green('\nProject initialization finished!\n'));
            console.log(chalk.cyan('To get start: \n'));
            console.log(`    cd ${dir} \n`);
            console.log('    npm i \n');
            console.log('    choubox create <filename> \n');
            console.log('    npm start \n');
            console.log('Documentation can be found at https://github.com/chou1213/webpack4-h5 \n\n');
        });
    }).catch(err => {
        console.log(chalk.red(err));
    });
};