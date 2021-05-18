//** Requiring in express.Router**//

const expressUser = require('express');
const routerUser = expressUser.Router();

//** Path to file controllers**//
const userControllerUser = require("../controllers/userController.ts");
const dbControllerUser = require("../controllers/dbController.ts");
const kafkaControllerUser = require("../controllers/kafkaController.ts");
const cookieControllerUser = require("../controllers/cookieController.ts");

routerUser.post('/signup', userControllerUser.createUser, (req, res) => {
  res.status(200).sendMessage('success');
});

routerUser.post('/login');

routerUser.get('/sessions');

module.exports = routerUser;