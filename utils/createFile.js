const fs = require('fs');

module.exports = function(paths) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(paths)) {
            let err = 'The directory is exist!\n\n';
            reject(err);
        } else {
            fs.mkdir(paths, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        }

    });
}