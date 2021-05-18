//** Requiring in express.Router**//

const expressImport = require('express');
const routerDB = expressImport.Router();

//** Path to file controllers**//
const userControllerFiles = require("../controllers/userController.ts");
const dbControllerFiles = require("../controllers/dbController.ts");
const kafkaControllerFiles = require("../controllers/kafkaController.ts");
const cookieControllerFiles = require("../controllers/cookieController.ts");

routerDB.get('/data');

module.exports = routerDB;