require("dotenv").config({path: __dirname + '../.env'});


//SECRET = 'f560bf0c02e7fa51af64064111a8ab8c40cebc967b849e60f7bdb6bcc25aa82d2e50846f15cfd8e1057a3cb7658962c12cf8967bb7f62b2671f24836ceaac6df'
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){
    const header = req.headers['authorization'];
    console.log(header)
    if (header) {
        const token = header.split(' ')[1];
        jwt.verify(token, process.env.SECRET, async (err, data) => {
            console.log(data);
            if(err){
                res.status(403).json({ err: 'Invalid token' })
            } else {
                next();
            }
        })
    } else {
        res.status(403).json({ err: 'Missing token' })
    }
}
module.exports = {
    verifyToken
}
















// function generateAccessToken(user) {
//   return jwt.sign(user, SECRET_KEY);
// }

// function verifyToken(req, res, next) {
//   const userName = req.body.userName;
//   const user = { userName: userName };

//   const accessToken = generateAccessToken(user);
//   console.log(accessToken);

//   return accessToken;
  