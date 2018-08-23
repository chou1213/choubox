const path = require('path');
const fs = require('fs');
var inquirer = require('inquirer');
const gitclone = require('git-clone')
const download = require('download');
const ora = require('ora');
module.exports = function(dir, cmd) {
    const paths = path.resolve(process.cwd(), './src/', dir);
    if (fs.existsSync(paths)) {
        console.log('the directory is exist');
    } else {
        //todo get template data
        const spinner = ora('downloading templates...');
        spinner.start();
        gitclone('https://github.com/chou1213/templates', path.resolve(__dirname, '../templates'), {}, err => {
            spinner.stop();
            if (err) {
                console.log(err);
                return false;
            }
        });
        inquirer.prompt([{
            type: 'list',
            message: 'which template do you need:',
            name: 'template',
            choices: ['simple', 'h5']
        }]).then((answers) => {
            //todo:create template 
            console.log(answers);
            // console.log(`https://github.com/chou1213/templates/${answers.template}`);
            // gitclone(`https://github.com/chou1213/templates`, 'src', {}, function(err) {
            //     if (err === undefined) {
            //         console.log('done');
            //     } else {
            //         console.log(err);
            //     }
            // })

            // download(`https://github.com/chou1213/templates`, 'dist', { extract: true, strip: 1, mode: '666', headers: { accept: 'application/zip' } }).then((err) => {
            //     if (err) console.log(err);
            //     console.log('done!');
            // });
        })



    }
}