const fs = require('fs');
const filePath = 'documents.json';

let documents = [];
try {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  documents = JSON.parse(fileData);
} catch (err) {
  console.error('Error reading file:', err);
}
$node['Documents'].context.set('documents', documents);
const query = $json.message;
let searchResult = "";
if(query.startsWith("/add")){
  const newDocument = query.substring(5);
  documents.push(newDocument);
  try {
    fs.writeFileSync(filePath, JSON.stringify(documents));
  } catch (err) {
    console.error('Error writing file:', err);
  }
  $node['Documents'].context.set('documents', documents);
  return [{
    json: {
        message: "document added"
    }
  }];
} else if(query.startsWith("/list")){
  searchResult = documents.join("\n");
  return [{
      json: {
          message: searchResult === "" ? "no result" : searchResult
      }
  }];
} else if (query.startsWith("/delete")) {
  const documentToDelete = query.substring(8);
  const index = documents.indexOf(documentToDelete);
  if (index > -1) {
      documents.splice(index, 1);
      try {
          fs.writeFileSync(filePath, JSON.stringify(documents));
      } catch (err) {
          console.error('Error writing file:', err);
      }
      $node['Documents'].context.set('documents', documents);
      return [{
        json: {
            message: "document deleted"
        }
      }];
  } else{
    return [{
      json: {
          message: "document not found"
      }
    }];
  }
}else {
  for (const document of documents) {
    if (document.includes(query)) {
      searchResult += document + "\n";
    }
  }
  return [{
      json: {
          message: searchResult === "" ? "no result" : searchResult
      }
  }];
}