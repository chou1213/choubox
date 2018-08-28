const request = require('request');
const download = require('download');
const fs = require('fs');
const path = require('path');


module.exports = (template, dir, paths) => {
    let downloadSource = [];
    request({
        url: 'https://api.github.com/repos/chou1213/templates/git/trees/master?recursive=1',
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
                        dirPath.shift();
                        console.log(path.resolve(paths, `./${dirPath.join('/')}`))
                        dirPath.pop();
                        downloadSource.push({ url: `https://raw.githubusercontent.com/chou1213/templates/master/${element.path}`, path: path.resolve(paths, `./${dirPath.join('/')}`) });
                    } else if (element.type === 'tree') {
                        dirPath.shift();
                        console.log(path.resolve(paths, `./${dirPath.join('/')}`))
                        fs.mkdir(path.resolve(paths, `./${dirPath.join('/')}`), function(err) {
                            if (err) {
                                console.log(err);
                            }
                        })
                    }
                }
            });

            console.log(downloadSource);
            // Promise.all(downloadSource.map(x => download(x.url, x.path))).then(() => {
            //     console.log('files downloaded!');
            // })
        } else {
            console.log(error);
        }
    });


};