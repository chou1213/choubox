const path = require('path');
const fs = require('fs');
var inquirer = require('inquirer');
const ora = require('ora');
const rm = require('rimraf').sync;
const cfs = require('../utils/createFile');
const clone = require('../utils/cloneGithub');
const chalk = require('chalk');


module.exports = function(dir, cmd) {
    const paths = path.resolve(process.cwd(), `./src/${dir}`);
    cfs(paths).then(() => {
        console.log('create');
        // clone('', paths).then(() => {
        //     rm(path.resolve(paths, './git'));

        // });
    }).catch(err => {
        console.log(chalk.red(err));
    });
    /* const paths = path.resolve(process.cwd(), './src/', dir);
    if (fs.existsSync(paths)) {
        console.log('the directory is exist');
    } else {
        //todo get template data
        inquirer.prompt([{
            type: 'list',
            message: 'which template do you need:',
            name: 'template',
            choices: ['simple', 'h5']
        }]).then((answers) => {
            //todo:create template 
            console.log(answers);
            console.log(`https://github.com/chou1213/templates/${answers.template}`);
            gitclone(`https://github.com/chou1213/templates`, 'src', {}, function(err) {
                if (err === undefined) {
                    console.log('done');
                } else {
                    console.log(err);
                }
            })

            download(`https://github.com/chou1213/templates`, 'dist', { extract: true, strip: 1, mode: '666', headers: { accept: 'application/zip' } }).then((err) => {
                if (err) console.log(err);
                console.log('done!');
            });
        })
    } */
}