const { readFile } = require("../../common/read-file")

function processReport() {
    let isSafe = true
    let previousLevel = 0
    let isDecreasing
    let violatingIndex = null
    for (let [index, level] of report.entries()) {
        if (previousLevel) {
            const diff = Math.abs(previousLevel - level)
            if (diff < 1 || diff > 3) {
                isSafe = false
                violatingIndex = index
                break;
            }

            if (previousLevel > level) {
                if (isDecreasing === false) {
                    isSafe = false
                    violatingIndex = index
                    break;
                }
                isDecreasing = true
            } else if (previousLevel < level) {
                if (isDecreasing === true) {
                    isSafe = false
                    violatingIndex = index
                    break;
                }
                isDecreasing = false
            } else if (previousLevel === level) {
                isSafe = false
                violatingIndex = index
                break
            }
        }

        previousLevel = level
    }
}

readFile(`${__dirname}/example-input.txt`, (data) => {
    const lines = data.split("\n")

    const reports = lines.map(line => line.split(" ").map(l => parseInt(l)))
    let safeCount = 0

    for (let report of reports) {


        if (isSafe) {
            safeCount++
        }

        console.log(report, isSafe ? "=> Safe" : "=> Unsafe", "Violating index: ", violatingIndex)
    }

    console.log("Total safe reports: ", `${safeCount}/${reports.length}`)
})
