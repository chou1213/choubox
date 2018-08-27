const request = require('request');

module.exports = function() {
    let choices = [];

    return new Promise((resolve, reject) => {
        request({
            url: 'https://api.github.com/repos/chou1213/templates/contents/',
            headers: {
                'User-Agent': 'request'
            }
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                info.forEach(element => {
                    if (element.type === 'dir') {
                        choices.push(element.name);
                    }
                })
                resolve(choices)
            } else {
                reject(error)
            }
        });

    });
}