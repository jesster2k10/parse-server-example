 Parse.Cloud.useMasterKey();

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('importdata', function (req, res) {
  const {
    className,
    rows
  } = req.params;

  const Class = Parse.Object.extend(className);

  let promises = [];

  rows.forEach(row => {
    let object = new Class();
    Object.keys(row).forEach((key) => {
        object.set(key, row[key]);
    });
    console.log(object)
    promises.push(object.save())
  });

  Promise.all(promises)
      .then(() => res.success({
        imported: true,
        message: `Imported ${rows.length} into ${className}`
      }))
      .catch(error => res.error({
        imported: false,
        message: error.message,
      }))
});

// Parse.Cloud.define("import", function (request, response) {
//   var className = request.params.className;
//   var rows = request.params.rows;
//
//   var MyClass = Parse.Object.extend(className);
//
//   var promises = [];
//   for (var i = 0; i < rows.length; i++) {
//     var myClassObject = new MyClass();
//
//     for (var column in rows[i]) {
//       myClassObject.set(column, rows[i][column]);
//     }
//
//     promises.push(myClassObject.save({ useMasterKey: true }));
//   }
//
//   Parse.Promise
//     .when(promises)
//     .then(
//       function () {
//         response.success('Successfully imported ' + i + ' rows into ' + className + ' class');
//       },
//       function (error) {
//         response.error('Import failed: ' + error);
//       });
// });
