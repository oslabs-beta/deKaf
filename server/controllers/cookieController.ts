/* Path to databse*/
const dbCookie = require("../models/userModel");

const cookieController = {
  //middleware to create a cookie and add that cookie to user
    createSessionCookie(req, res, next) {
        console.log('Inside cookie controller')
        //grabbing the username from the req.body and grabbing the userID from res.locals
        const { username } = req.body;
        const { userID } = res.locals;
        //initializing a timestamp for this cookie
        const now = new Date();
        //creating a query string to input the uuid username and the timestamp intp the sessions table
        const query = {
            text: 'INSERT INTO sessions (uuid,user_id,createdtime) VALUES ($1,$2,$3) RETURNING *',
            values: [username,userID,now]
        }
        //calling the query
        dbCookie.query(query)
            .then((session) => {
              //if there is no problem verifying the cookie
                res.cookie('SSID', session.rows[0]._id, { httpOnly: false, maxAge: 1000000 })
                return next();
            })
            .catch(err => console.log('ERROR TRYING TO ADD INTO SESSIONS DB: ', err))
    },
    //middleware to validate if the user has a cookie and if that cookie is a valid cookie to login
    sessionValidation(req, res, next) {
        console.log('entered verifySession')
        // if there is no cookie let the frontend know that the user is not valid and needs to login or create an account
        if (!req.cookies.ssid) return res.status(200).json({ message: 'noSession' });
        // if there is a cookie with the name ssid then grab the value of the ssid
        const { ssid } = req.cookies;
        //create a query and check if the ssid is a valid ssid in our db
        const query = {
            text: `SELECT ssid FROM sessions WHERE ssid = $1`,
            values: [ssid]
        }

        console.log('checking for session in db');
        dbCookie.query(query)
            .then(data => {
              //if nothing is returned then the ssid does not exist in the db and it is not a valid user
                if (!data.rows.length) return res.status(200).json({ message: 'noSession' })
                //if valid ssid then move on in the middleware
                res.locals.ssid = req.cookies.ssid;
                return next();
            })


    },

    getUserFromSSID(req, res, next) {

        const { ssid } = req.params;

        const query = {
            text: `SELECT username FROM sessions WHERE ssid = $1`,
            values: [ssid]
        }
        dbCookie.query(query)
            .then(data => {
                if (!data.rows.length) return res.status(200).json({ message: 'invalid ssid' })
                res.locals.username = data.rows[0].uuid;
                return next();
            })
    }
};

module.exports = cookieController;
