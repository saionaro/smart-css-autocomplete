const https = require("https");
const fs = require("fs");
const { join } = require("path");

const { readFile, writeFile, unlink } = fs.promises;

const ENCODING = "utf8";
const ENDPOINT = "https://www.chromestatus.com/data/csspopularity";
const TEMP = join(__dirname, "./raw-data.json");
const DEST = join(__dirname, "../src/css-props.json");

const fetchFile = () => {
  return new Promise((res, rej) => {
    const file = fs.createWriteStream(TEMP);
    const request = https.get(ENDPOINT, (response) => {
      response.pipe(file);
      response.once("end", () => {
        file.close();
        res();
      });
      response.once("error", () => {
        file.close();
        rej();
      });
    });
  });
};

const parseFile = async () => {
  const data = await readFile(TEMP, ENCODING);
  await unlink(TEMP);
  return JSON.parse(data);
};

const writeData = async (data) => {
  await writeFile(DEST, JSON.stringify(data, null, 2));
};

const extractProps = (data) => {
  const result = [];

  for (const rec of data) {
    if (!rec.day_percentage > 1) continue;
    let prop = rec.property_name;
    if (prop.startsWith("alias")) prop = prop.replace("alias", "");
    result.push(prop);
  }

  return result;
};

(async function () {
  try {
    await fetchFile();
    console.log("Data is fetched");
    const rawData = await parseFile();
    console.log("Data is parsed");
    const props = extractProps(rawData);
    await writeData(props);
  } catch (e) {
    console.error("Error while processing data");
    console.error(e);
  }
})();
