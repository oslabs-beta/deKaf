
/* Path to databse*/
const dbUser = require("../models/userModel");
import * as bcrypt from 'bcryptjs';

const userController = {

  createUser(req, res, next) {
    console.log('in createUser');
    const salt = bcrypt.genSaltSync(10);
    console.log(req.body.password);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash);
    const
    queryString:string = `
    INSERT INTO users (username, password)
    OUTPUT INSERTED.*
    VALUES ($1,$2)`,
    queryArgs:string[] = [req.body.username, hash];
    dbUser.query(queryString, queryArgs)
      .then((user) => {
        console.log(user);
        res.locals.newUser = user;
        next();
      })
      .catch((err) => {
        next({
          log: err
        })
      });
  },

  verifyUser(req, res, next) {
    const
    queryString:string = `
    SELECT username, password FROM users
    WHERE username=$1`,
    queryArgs:string[] = [req.body.username];

    dbUser.query(queryString, queryArgs)
      .then((user) => {
        console.log(user);
        if(user.password === req.body.password){
          res.locals.user = user;
          next();
        }
        else next({
          log: 'Authentication failed'
        })
      })
  }
};

module.exports = userController;