const { readFile } = require("../../common/read-file")

readFile(`${__dirname}/input.txt`, (data) => {
    let [rules, updates] = data.split("\n\n")

    // console.log(rules)

    rules = rules.split("\n")
    updates = updates.split("\n")

    let passed = []
    let failedUpdates = []
    let sum = 0;

    for (let update of updates) {
        const pages = update.split(",")

        let appliedRules = {}
        for (let page of pages) {
            appliedRules = { ...appliedRules, ...rules.reduce((acc, rule, index) => ({ ...acc, ...(rule.split("|").includes(page) ? { [index]: true } : {}) }), {}) }
        }

        let failed = false
        let changes = {}

        const checkPages = () => {
            for (let ruleIndex of Object.keys(appliedRules)) {
                const [left, right] = rules[ruleIndex].split("|")
                const leftIndex = pages.indexOf(left)
                const rightIndex = pages.indexOf(right)
                const passedBecauseMissing = leftIndex === -1 || rightIndex === -1
                const passedBecauseAdhered = leftIndex < rightIndex
                const rulePassed = passedBecauseMissing || passedBecauseAdhered

                if (!rulePassed) {
                    failed = true
                }

                if (!passedBecauseMissing && !passedBecauseAdhered) {
                    // console.log(pages, leftIndex, rightIndex, left, right)
                    pages[leftIndex] = right
                    pages[rightIndex] = left

                    checkPages()
                }
            }
        }

        checkPages()

        // console.log("update", update, failed)

        if (failed) {
            failedUpdates.push(pages)
            sum += (parseInt(pages[(pages.length - 1) / 2]))
        }
    }

    console.log(sum)
})
