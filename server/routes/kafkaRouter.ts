//** Requiring in express.Router**//

const expressKafka = require('express');
const routerKafka = expressKafka.Router();

//** Path to file controllers**//
const userControllerKafka = require("../controllers/userController.ts");
const dbControllerKafka = require("../controllers/dbController.ts");
const kafkaControllerKafka = require("../controllers/kafkaController.ts");
const cookieControllerKafka = require("../controllers/cookieController.ts");

module.exports = routerKafka;