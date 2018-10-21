const mysql = require('mysql');
const mysqlConfig = require('../../config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
  if (err) {
    console.log('error connecting ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
})

module.exports.connection = connection;