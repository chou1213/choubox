const path = require('path');
const fs = require('fs');
var inquirer = require('inquirer');
const ora = require('ora');
const rm = require('rimraf').sync;
const cfs = require('../utils/createFile');
const clone = require('../utils/cloneGithub');
const chalk = require('chalk');
const download = require('download');
const request = require('request-promise');

module.exports = function(dir, cmd) {
    //create folder
    const paths = path.resolve(process.cwd(), './src/', dir);

    cfs(paths).then(async() => {
        //get templates arrary list for select 
        let choices = await require('../utils/getGithubTemplateList')();

        // ask choices,select template
        inquirer.prompt([{
            type: 'list',
            message: 'which template do you need:',
            name: 'template',
            choices: choices
        }]).then((answers) => {
            //download tempolate
            require('../utils/downloadGithubFolder')(answers.template, dir, paths);
        });

    }).catch(err => {
        console.log(chalk.red(err));
    });
}