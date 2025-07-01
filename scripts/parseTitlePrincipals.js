const fs = require("fs");
const path = require("path");
const readline = require("readline");

const inputFile = path.join(__dirname, "../datasets/title.principals.tsv");
const outputFile = path.join(__dirname, "../datasets/title.principals.json");

const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);
const rl = readline.createInterface({ input: readStream, crlfDelay: Infinity });

let headers = [];
let isFirstLine = true;
let isFirstRecord = true;

writeStream.write("[\n"); // Start JSON array

rl.on("line", (line) => {
  if (isFirstLine) {
    headers = line.split("\t");
    isFirstLine = false;
  } else {
    const values = line.split("\t");
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i];
    });

    // Filter: only write the record if nconst matches
    // if (obj.nconst === "nm0000115") {
      const jsonString = JSON.stringify(obj);
      writeStream.write((isFirstRecord ? "" : ",\n") + jsonString);
      isFirstRecord = false;
    // }
  }
});

rl.on("close", () => {
  writeStream.write("\n]");
  writeStream.end();
  console.log("Done writing title principals file.");
});
