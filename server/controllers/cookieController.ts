/* Path to databse*/
const dbCookie = require("../models/userModel");

const cookieController = {
    createSessionCookie(req, res, next) {
        console.log('Inside cookie controller \n')
        // console.log(req.body)
        const { username } = req.body;

        const query = {
            text: 'INSERT INTO sessions(uuid) VALUES ($1) RETURNING *',
            values: [username]
        }

        dbCookie.query(query)
            .then((session) => {
                res.cookie('SSID', session.rows[0]._id, { httpOnly: false, maxAge: 1000000 })
                return next();
            })
            .catch(err => console.log('ERROR TRYING TO ADD INTO SESSIONS DB: ', err))
    },

    sessionValidation(req, res, next) {
        console.log('entered verifySession')
        if (!req.cookies.ssid) return res.status(200).json({ message: 'noSession' })

        //check in session db is cookie is valid
        //if query doesn't exist

        const query = {
            text: `SELECT ssid FROM sessions WHERE ssid = ${req.cookies.ssid}`,
        }

        console.log('checking for session in db');
        dbCookie.query(query)
            .then(data => {
                if (!data.rows.length) return res.status(200).json({ message: 'noSession' })
                res.locals.ssid = req.cookies.ssid;
                return next();
            })


    },

    getUserFromSSID(req, res, next) {

        const query = {
            text: `SELECT username FROM sessions WHERE ssid = ${req.params.ssid}`
        }
        dbCookie.query(query)
            .then(data => {
                if (!data.rows.length) return res.status(200).json({ message: 'invalid ssid' })
                res.locals.username = data.rows[0].username;
                return next();
            })
    }
};



module.exports = cookieController;