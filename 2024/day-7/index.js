const { readFile } = require("../../common/read-file");

function canBeTrue(result, lineValues) {
  const numbers = lineValues.split(" ").map((num) => parseInt(num));
  const operatorCount = numbers.length - 1;
  const possibilities = Array(3 ** operatorCount)
    .fill()
    .map((_, i) => {
      const operators = i
        .toString(3)
        .padStart(operatorCount, "0")
        .replace(/0/g, "*")
        .replace(/1/g, "+")
        .replace(/2/g, "c");
      const equation = lineValues
        .split(" ")
        .map((num, i) => num + (operators[i] ? ` ${operators[i]} ` : ""))
        .join("")
        .split(" ");

      let total = 0;
      let currentOperation = null;
      for (let value of equation) {
        if (["*", "+", "c"].includes(value)) {
          currentOperation = value;
        } else {
          const item = parseInt(value);
          if (currentOperation === "*") {
            total *= item;
          } else if (currentOperation === "+") {
            total += item;
          } else if (currentOperation === "c") {
            total = parseInt(`${total}${item}`);
          } else {
            total = item;
          }
        }
      }
      return total;
    });

  return possibilities.includes(result);
}

readFile(`${__dirname}/example-input.txt`, (data) => {
  const lines = data.split("\n");

  let sum = 0;
  for (let line of lines) {
    const parts = line.split(":");
    const result = parseInt(parts[0]);
    const lineValue = parts[1].trim();

    if (canBeTrue(result, lineValue)) {
      sum += result;
    }
  }

  console.log("Sum:", sum);
});
