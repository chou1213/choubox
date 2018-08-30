const request = require('request');
const download = require('download');
const path = require('path');
const cfs = require('./createFile');
const chalk = require('chalk');
const numjucks = require('nunjucks');


module.exports = (template, dir, paths) => {
    let downloadSource = [];
    request({
        url: 'https://api.github.com/repos/chou1213/choubox-templates/git/trees/master?recursive=1',
        headers: {
            'User-Agent': 'request'
        }
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            // console.log(info.tree);
            info['tree'].forEach(element => {
                if (element.path.indexOf(template) >= 0) {
                    let dirPath = element.path.split('/');
                    if (element.type === 'blob' && dirPath[dirPath.length - 1].indexOf('.') > 0) {
                        dirPath[0] = './';
                        dirPath.pop();
                        downloadSource.push({ url: `https://raw.githubusercontent.com/chou1213/choubox-templates/master/${element.path}`, path: path.resolve(paths, dirPath.join('/')) });
                    } else if (element.type === 'tree') {
                        dirPath[0] = './';
                        cfs(path.resolve(paths, dirPath.join('/')), ).then(() => {}).catch(err => {
                            // console.log(err);
                        });
                    }
                }
            });
            Promise.all(downloadSource.map(x => download(x.url, x.path))).then((res) => {
                console.log(res);
                console.log(chalk.green('\nFiles downloaded!\n\n'));
            }).catch(err => {
                console.log(err);
            })
        } else {
            console.log(error);
        }
    });


};