/* Path to databse*/
const dbCookie = require("../models/userModel");

const cookieController = {
    createSessionCookie(req, res, next) {
        console.log('Inside cookie controller \n')
        // console.log(req.body)
        const { username } = req.body;
        const { userID } = res.locals;
        const now = new Date();
        //username needs to be bcrypted
        //
        const query = {
            text: 'INSERT INTO sessions(uuid,user_id,createdtime) VALUES ($1,$2,$3) RETURNING *',
            values: [username,userID,now]
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
        if (!req.cookies.ssid) return res.status(200).json({ message: 'noSession' });
        
        const { ssid } = req.cookies;

        //check in session db is cookie is valid
        //if query doesn't exist

        const query = {
            text: `SELECT ssid FROM sessions WHERE ssid = $1`,
            values: [ssid]
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



// cookieController.createSessionCookie = (req,res,next) => {
//     console.log('********* COOKIE CONTROLLER START *********')
//     // console.log(req.body)
//     const { username } = req.body;
    
//     const newSSID = () => {
//       const SSID = Math.floor(Math.random() * 1000000000000);
//       db.query(`SELECT ssid FROM sessions`)
//         .then(data => {
//           console.log(data.rows);
//           for (let session of data.rows) {
//             if (session.ssid === SSID) return newSSID();
//           }
//           console.log(SSID);
//           setCookie(SSID);
//         })
//     }
  
//     const setCookie = (SSID) => {
//       res.locals.ssid = SSID;
      
//       res.cookie('ssid', SSID, {httpOnly: false, maxAge: 1000000})
      
//       const query = {
//         text: 'INSERT INTO sessions(ssid, username) VALUES ($1, $2)',
//         values: [SSID, username]
//       }
  
//       //const queryString = 'INSERT INTO sessions (ssid, username) VALUES ($1, $2)';
      
//       // server is running on 8080, if you want to test
  
//       db.query(query)
//         .then(() => next())
//         .catch(err => console.log('MAJOR PROBLEM TRYING TO ADD INTO SESSIONS DB: ', err))
//     }
  
//     newSSID();
//   }