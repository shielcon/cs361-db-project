var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_shielcon',
  password        : '3051',
  database        : 'cs340_shielcon'
});
module.exports.pool = pool;
