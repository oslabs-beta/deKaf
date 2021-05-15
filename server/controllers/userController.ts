
/* Path to databse*/
const dbUser = require("../models/userModel");

const userController = {

  createUser(req, res, next) {
    const 
    queryString:string = `
    INSERT INTO users (username,password) VALUES ($1,$2)`,
    queryArgs:string[] = [req.body.username, req.body.password];
    
    dbUser.query(queryString, queryArgs)
      .then(() => {
        
      });
  }
};

module.exports = userController;