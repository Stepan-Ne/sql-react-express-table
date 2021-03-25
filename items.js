import express from 'express'
import db from './dbConfig.js'

const router = express.Router()

// GET
// @desc Get All Users
router.get('/', (req, res) => {
// get a timestamp before running the query
var pre_query = new Date().getTime();

  let sql = 'SELECT * FROM tableApp';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ table: results });
    var post_query = new Date().getTime();
    // calculate the duration in seconds
    var duration = (post_query - pre_query);
    console.log("DURATION", duration + ' мсек')
  
  }); 
})
// @desc Get calculated data
router.get('/calc', (req, res) => {

  let sql =
    "SELECT DATE_FORMAT(dateReg, '%d-%m-%y') AS reg, DATE_FORMAT(dateLastActiv, '%d-%m-%y') AS lastAct FROM tableApp WHERE DATEDIFF(dateLastActiv, dateReg) >= 7; SELECT DATE_FORMAT(dateReg, '%d-%m-%y') AS reg, DATE_FORMAT(dateLastActiv, '%d-%m-%y') AS lastAct FROM tableApp WHERE DATEDIFF(dateLastActiv, dateReg) <= 7";
    let sql1 = 'SELECT dateReg FROM tableApp WHERE dateReg BETWEEN DATEADD(WEEK,-1,GETDATE()) AND GETDATE()'
    
    db.query(sql, (err, results) => {
     console.log("RESULTS", results)
      if (err) {
        console.log(err);
      } else {
        let calc = ((results[0].length / results[1].length) * 100).toFixed(1);
        res.json({ message: calc });
      }
    });
})

// POST
// @desc Add User
router.post('/', (req, res) => {

  const sql = 'INSERT INTO tableApp (dateReg, dateLastActiv) VALUES (?, ?)';
  const { dateReg, dateLastActiv } = req.body;

  db.query(sql, [dateReg, dateLastActiv], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ message: 'User was add', result });
    }
  });
})

// DELETE
// @desc delete user
router.delete('/:id', (req, res) => {

  const sql =  'DELETE FROM `tableApp` WHERE `tableApp`.`id` = ?'
  const { id } = req.params;
  db.query(sql,
    [id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'user was delete' });
    }
  );
})

function calcul(arr) {
if (arr[1].length == 0) {
  return 0;
} else {
  ((arr[0].length / arr[1].length) * 100).toFixed(1)
}

}

export default router;