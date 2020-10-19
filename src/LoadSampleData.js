var fs = require('fs');
var d3 = require('d3');

var abiotic_string = fs.readFileSync('../sampleData/abiotic_cleaned.csv', 'ascii');
var coded_string = fs.readFileSync('../sampleData/coded_cleaned.csv', 'ascii');
var computational_string = fs.readFileSync('../sampleData/computational_cleaned.csv', 'ascii');

var abiotic_data = d3.csvParse(abiotic_string, d3.autoType);
var coded_data = d3.csvParse(coded_string, d3.autoType);
var computational_data = d3.csvParse(computational_string, d3.autoType);

abiotic_data.forEach(function(value, index, array) {
    array[index]["type"] = "abiotic";
})

coded_data.forEach(function(value, index, array) {
    array[index]["type"] = "coded";
})

computational_data.forEach(function(value, index, array) {
    array[index]["type"] = "comp";
})

var data = abiotic_data.concat(coded_data).concat(computational_data);

var data_json = JSON.stringify(data);
fs.writeFile('../sampleData/data.json', data_json, (err) => {
    if (err) throw err;
    console.log('success');
})
