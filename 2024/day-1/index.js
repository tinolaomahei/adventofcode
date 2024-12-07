const { readFile } = require("../../common/read-file")


function getDistance(left, right) {
    const sortedLeft = left.sort()
    const sortedRight = right.sort()
    return sortedLeft.map((l, i) => Math.abs(l - sortedRight[i])).reduce((total, num) => total + num, 0)
}

function getSimilarityScore(left, right) {
    const reduced = right.reduce((acc, value) => ({ ...acc, [value]: (acc[value] || 0) + 1 }), {})
    return left.reduce((acc, value) => (acc + (value * (reduced[value] || 0))), 0)
}

readFile(`${__dirname}/input.txt`, (data) => {
    const parts = data.split("\n").map(pair => {
        const parts = pair.split("   ");
        return { left: parseInt(parts[0]), right: parseInt(parts[1]) }
    })
    const left = parts.map(part => part.left)
    const right = parts.map(part => part.right)

    const distance = getDistance(left, right)
    const similarityScore = getSimilarityScore(left, right)
    console.log("Distance: ", distance)
    console.log("Similarity Score: ", similarityScore)
})
