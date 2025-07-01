const fs = require("fs");
const path = require("path");
const readline = require("readline");

//title.principals-cage.json containing those movies connected to nicolas cage only to filter it for title.basics.json
const principalsJsonFile = path.join(__dirname, "../datasets/title.principals-cage.json");
const basicsTsvFile = path.join(__dirname, "../datasets/title.basics.tsv");
const basicsOutputFile = path.join(__dirname, "../datasets/title.basics.json");


const principals = JSON.parse(fs.readFileSync(principalsJsonFile, "utf-8"));
const tconstSet = new Set(principals.map(record => record.tconst));

const readStream = fs.createReadStream(basicsTsvFile);
const writeStream = fs.createWriteStream(basicsOutputFile);
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

    if (tconstSet.has(obj.tconst)) {
      const jsonString = JSON.stringify(obj);
      writeStream.write((isFirstRecord ? "" : ",\n") + jsonString);
      isFirstRecord = false;
    }
  }
});

rl.on("close", () => {
  writeStream.write("\n]");
  writeStream.end();
  console.log("Done writing filtered title.basics JSON file for Nicolas Cage.");
});
