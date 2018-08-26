const request = require('request-promise');

module.exports = async function() {
    let choices = [];
    await request({
            uri: 'https://api.github.com/repos/chou1213/templates/contents/',
            headers: {
                'User-Agent': 'request'
            },
            json: true
        })
        .then(function(res) {
            res.forEach(element => {
                if (element.type === 'dir') {
                    choices.push(element.name);
                }
            })

        })
        .catch(function(err) {
            console.log(err);
        });

    return choices;
}