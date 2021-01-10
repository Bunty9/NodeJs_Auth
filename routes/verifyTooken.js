// GNU GENERAL PUBLIC LICENSE
// Version 3, 29 June 2007

// Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
// Everyone is permitted to copy and distribute verbatim copies
// of this license document, but changing it is not allowed.

//      Preamble

// The GNU General Public License is a free, copyleft license for
// software and other kinds of works.



const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token = req.header('authToken');
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user =verified;
        next();
    } catch (err) {
        res.status(400).send('invalid token');
    }
}