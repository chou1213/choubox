const path = require('path');
var inquirer = require('inquirer');
const rm = require('rimraf').sync;
const cfs = require('../utils/createFile');
const chalk = require('chalk');

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
        rm(paths);
        console.log(chalk.red(err));
    });
}