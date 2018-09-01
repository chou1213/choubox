const path = require('path');
const fs = require('fs');
const request = require('request');
const download = require('download');
const chalk = require('chalk');
const nunjucks = require('nunjucks');
const ora = require('ora');
const cfs = require('./createFile');
const rm = require('rimraf').sync;

module.exports = (template, dir, paths) => {
    let downloadSource = [];
    const spinner = ora(`download ${template} template...`);
    spinner.start();
    request({
        url: 'https://api.github.com/repos/chou1213/choubox-templates/git/trees/master?recursive=1',
        headers: {
            'User-Agent': 'request'
        }
    }, (error, response, body) => {
        spinner.stop();
        var info = JSON.parse(body);
        if (!error && response.statusCode == 200) {
            info['tree'].forEach(element => {
                if (element.path.indexOf(template) >= 0) {
                    let dirPath = element.path.split('/');
                    dirPath[0] = './';
                    if (element.type === 'blob' && dirPath[dirPath.length - 1].indexOf('.') > 0) {
                        dirPath.pop();
                        downloadSource.push({ url: `https://raw.githubusercontent.com/chou1213/choubox-templates/master/${element.path}`, path: path.resolve(paths, dirPath.join('/')) });
                    } else if (element.type === 'tree') {
                        //create empty folder
                        cfs(path.resolve(paths, dirPath.join('/')), ).then(() => {}).catch(err => {});
                    }
                }
            });
            Promise.all(downloadSource.map(x => download(x.url, x.path))).then((res) => {
                nunjucks.configure(path.resolve(paths), { autoescape: true })
                let date = new Date();
                let str = nunjucks.render('./config.js', { dir: dir, date: `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}` });
                fs.writeFileSync(path.resolve(paths, './config.js'), str)
                console.log(chalk.green('\nCreated successfully!\n'));
                console.log(chalk.cyan('To get start: \n'));
                console.log('    npm start\n');
                console.log('    npm run build\n');
            }).catch(err => {
                rm(paths);
                console.log(err);
            })
        } else {
            rm(paths);
            console.log(info.message);
        }
    });
};