import db from '../dbConfig.js';

class UserController {
  async addUser(req, res) {
    try {
      const sql =
        'INSERT INTO tableApp (dateReg, dateLastActiv) VALUES ($1, $2) RETURNING *';
      const { dateReg, dateLastActiv } = req.body;
      const newUser = await db.query(sql, [dateReg, dateLastActiv]);
      res.json({ result: newUser.rows[0] });
    } catch (e) {
      res.json({ message: 'Wake up, Neo...' });
    }
  }
  async deleteUser(req, res) {
    try {
      const sql = 'DELETE FROM tableApp WHERE id = $1';
      const { id } = req.params;
      const result = await db.query(sql, [id]);
      res.json({result: 'user was delete'});
    } catch (e) {
      res.json({ message: 'The Matrix has you...' });
    }
  }
  async getAllUsers(req, res) {
    try {
      const sql = 'SELECT * FROM tableApp';
      const result = await db.query(sql);
      res.json({ table: result.rows });
    } catch (e) {
      res.json({ message: 'Follow the white rabbit.' });
    }
  }
  async getCalculatedData(req, res) {
    try {
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
    } catch (e) {
      res.json({ message: 'Knock, knock, Neo.' });
    }
  }
}

export default new UserController();
