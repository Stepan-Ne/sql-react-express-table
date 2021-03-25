// import mysql from 'mysql';
import pg from 'pg';

const Pool = pg.Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'root2',
  host: 'localhost',
  port: 5432,
  database: 'dates',
});

export default pool;
