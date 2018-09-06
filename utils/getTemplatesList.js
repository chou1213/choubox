const fs = require('fs');
const path = require('path');

module.exports = function(tmp) {
    let choices = [];
    return new Promise((resolve, reject) => {
        fs.readdir(tmp, (err, files) => {
            if (err) {
                reject(err);
            } else {
                files.forEach(element => {
                    let stat = fs.statSync(path.resolve(tmp, element));
                    stat.isDirectory() && choices.push(element);
                })
                resolve(choices);
            }
        });
    });
}