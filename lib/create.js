const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const userHome = require('user-home');
const inquirer = require('inquirer');
const rm = require('rimraf').sync;
const chalk = require('chalk');
const cfs = require('../utils/createFile');
const clone = require('../utils/cloneGithub');
const getTemplatesList = require('../utils/getTemplatesList');

module.exports = async function(dir, cmd) {
    //The project's path
    const paths = path.resolve(process.cwd(), 'src', dir);

    //The tmp’s path
    const tmp = path.resolve(userHome, '.choubox-template');

    //Create the project's folder
    await cfs(paths).catch(err => {
        console.log(chalk.red(err));
        process.exit(1)
    });

    //Create the tmp's folder
    if (fs.existsSync(tmp)) {
        rm(tmp);
    }
    await cfs(tmp).catch(err => {
        rm(paths);
        console.log(chalk.red(err));
        process.exit(1)
    });

    //Clone the templates to tmp's path
    await clone('https://github.com/chou1213/choubox-templates', tmp).then(() => {
        rm(path.resolve(tmp, '.git'));
        rm(path.resolve(tmp, '.gitignore'));
    }).catch(err => {
        rm(paths);
        console.log(chalk.red(err));
        process.exit(1)
    });

    //Get the template's array
    const choices = await getTemplatesList(tmp).catch(err => {
        rm(paths);
        console.log(chalk.red(err));
        process.exit(1)
    });

    //Ask choices,select template
    inquirer.prompt([{
        type: 'list',
        message: 'which template do you need:',
        name: 'template',
        choices: choices
    }]).then((answers) => {
        //copy tempolate to dest path
        fse.copy(path.resolve(tmp, answers.template), paths)
            .then(() => {
                console.log(chalk.green('\nCreated successfully!\n'));
                console.log(chalk.cyan('To get start: \n'));
                console.log('    npm start \n');
                console.log('    npm run build \n');
            })
            .catch(err => {
                rm(paths);
                console.log(chalk.red(err));
                process.exit(1)
            })

    });

}