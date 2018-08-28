const request = require('request');
const download = require('download');


module.exports = (template, dir) => {
    let downloadSource = [];
    request({
        url: 'https://api.github.com/repos/chou1213/templates/git/trees/master?recursive=1',
        headers: {
            'User-Agent': 'request'
        }
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info.tree);
            info['tree'].forEach(element => {
                if (element.path.indexOf(template) >= 0) {
                    console.log(element.type);
                    if (element.type === 'blob') {
                        downloadSource.push({ url: `https://raw.githubusercontent.com/chou1213/templates/master/${element.path}`, path: element.path });
                    } else if (element.type === 'tree') {

                    }
                }
            });

            console.log(downloadSource);
            Promise.all(downloadSource.map(x => download(x.url, x.path))).then(() => {
                console.log('files downloaded!');
            })
        } else {
            console.log(error);
        }
    });


};