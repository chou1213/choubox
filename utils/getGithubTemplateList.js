const request = require('request');
const ora = require('ora');

module.exports = function() {
    let choices = [];
    const spinner = ora('geting github template\'s list...');
    spinner.start();
    return new Promise((resolve, reject) => {
        request({
            url: 'https://api.github.com/repos/chou1213/choubox-templates/contents/',
            headers: {
                'User-Agent': 'request'
            }
        }, (error, response, body) => {
            spinner.stop();
            var info = JSON.parse(body);
            if (!error && response.statusCode == 200) {
                info.forEach(element => {
                    if (element.type === 'dir') {
                        choices.push(element.name);
                    }
                })
                resolve(choices)
            } else {
                reject(info.message)
            }
        });

    });
}