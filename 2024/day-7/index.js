const { readFile } = require("../../common/read-file");

const evalLR = (eq) =>
  eq
    .split(/\s*(\+|\*)\s*/)
    .reduce(
      (r, e, i, a) => (i % 2 ? r : r + (a[i - 1] === "*" ? r * e - r : +e)),
      0
    );

function canBeTrue(result, lineValues) {
  const numbers = lineValues.split(" ").map((num) => parseInt(num));
  const operatorCount = numbers.length - 1;
  const possibilities = Array(2 ** operatorCount)
    .fill()
    .map((_, i) => {
      const operators = i
        .toString(2)
        .padStart(operatorCount, "0")
        .replace(/0/g, "*")
        .replace(/1/g, "+");
      const equation = lineValues
        .split(" ")
        .map((num, i) => num + (operators[i] || ""))
        .join("");

      return evalLR(equation);
    });

  return possibilities.includes(result);
}

readFile(`${__dirname}/input.txt`, (data) => {
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
