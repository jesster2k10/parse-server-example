 Parse.Cloud.useMasterKey();

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define("import", function (request, response) {
  var className = request.params.className;
  var rows = request.params.rows;

  var MyClass = Parse.Object.extend(className);

  var promises = [];
  for (var i = 0; i < rows.length; i++) {
    var myClassObject = new MyClass();

    for (var column in rows[i]) {
      myClassObject.set(column, rows[i][column]);
    }

    promises.push(myClassObject.save({ useMasterKey: true }));
  }

  Parse.Promise
    .when(promises)
    .then(
      function () {
        response.success('Successfully imported ' + i + ' rows into ' + className + ' class');
      },
      function (error) {
        response.error('Import failed: ' + error);
      });
});
