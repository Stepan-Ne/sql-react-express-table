// import mysql from 'mysql';
import pg from 'pg';

const Pool = pg.Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'root2',
  host: 'localhost',
  port: 5432,
  database: 'dates'
})

// // Create connection DB
// const db = mysql.createConnection({
//   host: 'sql11.freesqldatabase.com',
//   port: '3306',
//   user: 'sql11397223',
//   password: 'SuzIIBGNyz',
//   database: 'sql11397223',
//   multipleStatements: true,
// });


export default pool;