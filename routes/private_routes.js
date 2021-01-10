// GNU GENERAL PUBLIC LICENSE
// Version 3, 29 June 2007

// Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
// Everyone is permitted to copy and distribute verbatim copies
// of this license document, but changing it is not allowed.

//      Preamble

// The GNU General Public License is a free, copyleft license for
// software and other kinds of works.

const router = require('express').Router();
const verify = require('./verifyTooken');

router.get('/',verify,(req,res)=>{
    res.send(req.user);
});

module.exports = router;