import db from '../dbConfig.js';

class UserController {
  async addUser(req, res) {
    const sql =
      'INSERT INTO tableApp (dateReg, dateLastActiv) VALUES ($1, $2) RETURNING *';
    const { dateReg, dateLastActiv } = req.body;
    const newUser = await db.query(sql, [dateReg, dateLastActiv]);
    res.json({ message: 'User was add', result: newUser.rows[0] });
  }
  async deleteUser(req, res) {
    const sql = 'DELETE FROM tableApp WHERE id = $1';
    const { id } = req.params;
    const result = await db.query(sql, [id]);
    res.json({ message: 'user was delete' });
  }
  async getAllUsers(req, res) {
    const sql = 'SELECT * FROM tableApp';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json({ table: result.rows });
    });
  }
  async getCalculatedData(req, res) {
    let sql1 =
      "SELECT dateReg FROM tableApp WHERE dateReg <= NOW() and dateReg >= NOW() - INTERVAL '7 DAY'";
    let sql2 =
      "SELECT dateLastActiv FROM tableApp WHERE dateLastActiv <= NOW() - INTERVAL '7 DAY'";
    const resultReg = await db.query(sql1);
    const resultLast = await db.query(sql2);
    let retention = 0;
    if (resultReg.rows.length > 0 && resultLast.rows.length > 0) {
      retention = (resultLast.rows.length / resultReg.rows.length) * 100;
    }
    res.json({ calc: retention });
  }
}

export default new UserController();
