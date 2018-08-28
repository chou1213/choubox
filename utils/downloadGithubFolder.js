const request = require('request');

module.exports = (url, type) => {
    request({
        url: 'https://api.github.com/repos/chou1213/templates/git/trees/master?recursive=1',
        headers: {
            'User-Agent': 'request'
        }
    }, (error, response, body) => {

        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            // console.log(info);
            info.forEach(element => {

            });

        } else {
            console.log(error);
        }
    });


};