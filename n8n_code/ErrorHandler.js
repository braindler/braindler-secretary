const fs = require('fs');
const filePath = 'ErrorLogs.json';
let errors = [];
try {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  errors = JSON.parse(fileData);
} catch (err) {
  console.error('Error reading file:', err);
}

const error = $json.error;
const time = Date.now();
errors.push({time: time, error: error});

try {
  fs.writeFileSync(filePath, JSON.stringify(errors));
} catch (err) {
  console.error('Error writing file:', err);
}
console.error("Error was saved:", error);
return [{
    json: {
      message: $json.message
    }
}];