const { readFile } = require("../../common/read-file");

readFile(`${__dirname}/example-input.txt`, (data) => {
    let obstacleKey = "#";
    let guardKey = "^";
    let lines = data.split("\n");
    let directions = {
        up: [0, -1],
        right: [1, 0],
        down: [0, 1],
        left: [-1, 0],
    };
    const destinations = {
        up: "right",
        right: "down",
        down: "left",
        left: "up",
    };
    let currentDirection = "up";

    let obstacles = [];
    let guardCoord = {};

    for (let [index, line] of lines.entries()) {
        const points = line.split("");
        for (let [pointIndex, point] of points.entries()) {
            if (point === obstacleKey) {
                obstacles.push({ x: pointIndex, y: index });
            }

            if (point === guardKey) {
                guardCoord = { x: pointIndex, y: index };
            }
        }
    }

    let currentCoord = { ...guardCoord };
    let visited = { [`${guardCoord.x},${guardCoord.y}`]: true };
    let loopCount = 0
    while (
        currentCoord.x >= 0 &&
        currentCoord.x < lines[0].length &&
        currentCoord.y >= 0 &&
        currentCoord.y < lines.length
    ) {
        const direction = directions[currentDirection];
        const nextCoord = {
            x: direction[0],
            y: direction[1],
        };

        const nextX = currentCoord.x + nextCoord.x;
        const nextY = currentCoord.y + nextCoord.y;

        const obs = obstacles.filter((o) => o.x === nextX && o.y === nextY);
        if (obs.length) {
            currentDirection = destinations[currentDirection];
            const newDirection = directions[currentDirection];
            nextCoord.x = newDirection[0];
            nextCoord.y = newDirection[1];
        }

        currentCoord.x += nextCoord.x;
        currentCoord.y += nextCoord.y;

        visited = { ...visited, [`${currentCoord.x},${currentCoord.y}`]: true };
    }

    console.log("Part 1:", Object.keys(visited).length - 1);
})
