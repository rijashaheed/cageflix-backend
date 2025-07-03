const fs = require("fs");
const path = require("path");
const readline = require("readline");

const inputFile = path.join(__dirname, "../datasets/title.ratings.tsv");
const outputFile = path.join(__dirname, "../datasets/title.ratings.json");

const rl = readline.createInterface({
  input: fs.createReadStream(inputFile),
  crlfDelay: Infinity,
});

let headers = [];
let isFirstLine = true;
let isFirstRecord = true;

const writeStream = fs.createWriteStream(outputFile);
writeStream.write("[\n");

rl.on("line", (line) => {
  if (isFirstLine) {
    headers = line.split("\t");
    isFirstLine = false;
    return;
  }

  const values = line.split("\t");
  const obj = {};
  headers.forEach((header, i) => {
    obj[header] = values[i];
  });

  const jsonString = JSON.stringify(obj);
  writeStream.write((isFirstRecord ? "" : ",\n") + jsonString);
  isFirstRecord = false;
});

rl.on("close", () => {
  writeStream.write("\n]");
  writeStream.end();
  console.log("Full ratings data written to title.ratings.json");
});
