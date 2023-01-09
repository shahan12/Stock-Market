export const massageData = (arr) => {
  var convertedData = [];
  var headers = arr[0].split(",");
  for (var i = 1; i < arr.length; i++) {
    var data = arr[i].split(",");
    var obj = {};
    for (var j = 0; j < data.length; j++) {
      obj[headers[j].trim()] = data[j].trim();
    }
    convertedData.push(obj);
  }
  return convertedData;
};
