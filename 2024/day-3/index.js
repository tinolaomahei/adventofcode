const { readFile } = require("../common/read-file");

const indexOfSubstrings = function* (str, searchValue) {
    let i = 0;
    while (true) {
        const r = str.indexOf(searchValue, i);
        if (r !== -1) {
            yield r;
            i = r + 1;
        } else return;
    }
};

function getInstructions(data) {
    const indicies = [...indexOfSubstrings(data, "mul(")];

    const doKey = "do()";
    const dontKey = "don't()";
    const doIndicies = [...indexOfSubstrings(data, doKey)];

    let windows = [];
    for (let doIndex of doIndicies) {
        const substring = data.substr(doIndex);
        const dontIndex = substring.indexOf(dontKey);

        const window = {
            start: doIndex + doKey.length,
            end: dontIndex === -1 ? data.length - 1 : dontIndex + doIndex,
        };

        windows.push(window);
    }

    windows = [{ start: 0, end: data.indexOf(dontKey) }, ...windows];

    let sum = 0;

    for (let index of indicies) {
        const substring = data.substr(index);
        const closingIndex = substring.indexOf(")");
        const instruction = substring.substr(0, closingIndex + 1);
        const paramString = instruction.replace("mul(", "").replace(")", "");
        const parts = paramString.split(",");

        if (parts.length === 2) {
            const firstArg = parts[0];
            const secondArg = parts[1];

            const firstFail = /[^0-9]/.test(firstArg);
            const secondFail = /[^0-9]/.test(secondArg);

            if (
                firstFail ||
                secondFail ||
                firstArg.trim() === "" ||
                secondArg.trim() === ""
            ) {
                continue;
            }

            const w = windows.filter(
                (window) => index >= window.start && index <= window.end
            );

            if (w.length) {
                sum += firstArg * secondArg;
            }
        }
    }

    console.log("Sum =>", sum);
}

(async () => {
    const data = await readFile(`${__dirname}/input.txt`);

    const instructions = getInstructions(data);
})();
