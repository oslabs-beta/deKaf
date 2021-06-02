
/* Path to databse*/
const dbUser = require('../models/userModel');
import * as bcrypt from 'bcryptjs';

const userController = {
  createUser(req, res, next) {
    console.log('in createUser');
    console.log('checking if user exists');
    const
      queryString1: string = `
      SELECT username FROM users
      WHERE username=$1`,
      queryArgs1: string[] = [req.body.username];
    dbUser.query(queryString1, queryArgs1, (err, user) => {
      console.log(user.rows)
      if (user.rows.length!==0) return res.status(400).json('userExists');
      console.log('no duplicate, now creating user');
      const salt = bcrypt.genSaltSync(10);
      console.log(req.body.password);
      const hash = bcrypt.hashSync(req.body.password, salt);
      console.log(hash);
      const
        queryString2: string = `
        INSERT INTO users (username, password)
        VALUES ($1,$2) RETURNING *`,
        queryArgs2: string[] = [req.body.username, hash];
      dbUser.query(queryString2, queryArgs2, (err, user) => {
        if (err) return next({ log: err });
        console.log('finished query:', user.rows[0]);
        res.locals.userID = user.rows[0]['_id'];
        console.log(res.locals.userID);
        return next();
      });
    })
  },

  verifyUser(req, res, next) {
    //
    const
      queryString: string = `
    SELECT * FROM users
    WHERE username=$1`,
      queryArgs: string[] = [req.body.username];

    dbUser.query(queryString, queryArgs, (err, user) => {
      console.log(user.rows[0]);
      if (user.rows.length===0) return res.status(400).json('unkUser');
      bcrypt.compare(req.body.password, user.rows[0].password, (err, isMatch) => {
        if (err) console.log('Error in bcrypt hashing, verifyUser: ', err)
        if (!isMatch) return res.status(200).json({message: 'notMatching'});
        console.log('password correct!');
        res.locals.userID = user.rows[0]['_id'];
        console.log(res.locals.userID);
        return next();
      })
    })
  }
};

module.exports = userController;