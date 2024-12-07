const { readFile } = require("../common/read-file")

readFile(`${__dirname}/example-input.txt`, (data) => {
    console.log(data)
})
