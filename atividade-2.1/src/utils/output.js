import fs from 'fs';

function writeJson(obj, path) {
  const json = JSON.stringify(obj, null, 2);
  fs.writeFile(path, json, (err) => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });
}

export default writeJson;
