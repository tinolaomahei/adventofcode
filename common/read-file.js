const fs = require('node:fs');

module.exports = {
    readFile: (filename, callback) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            callback(data)
        });
    }
}