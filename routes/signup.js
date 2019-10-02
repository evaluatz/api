const express = require('express');
const router = express.Router();

//AUTH
const classic = require("../auth/classic");

router.post('/classic', async function (req, res, next) {
    res.set("Cached-Control", "public, max-age=300, s-maxage-600");
    if (!req.body.username || !req.body.firstname || !req.body.lastname || 
        !req.body.email || !req.body.password) {
        res.send({ isSuccess: false, errors: [{ field: "Signup", msg: "Bad Request" }] })
    } else {
        let username = req.body.username;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let password = req.body.password;

        classic.upsertUser(username, firstname, lastname, email, password, function(user){
            res.send(user);
        });
    }
});

router.get('/classic', async function (req, res, next) {
    res.set("Cached-Control", "public, max-age=300, s-maxage-600");
    if (!req.query.username || !req.query.firstname || !req.query.lastname || 
        !req.query.email || !req.query.password) {
        res.send({ isSuccess: false, errors: [{ field: "Signup", msg: "Bad Request" }] })
    } else {
        let username = req.query.username;
        let firstname = req.query.firstname;
        let lastname = req.query.lastname;
        let email = req.query.email;
        let password = req.query.password;
        classic.upsertUser(username, firstname, lastname, email, password, function(user){
            res.send(user);
        });
    }
});
// http://localhost:5000/signup/classic?username=guigng&password=1234&firstname=Guilherme&lastname=Nazareth&email=guigng@gmail.com
// http://localhost:5000/signup/classic?username=Abacate&password=1234&firstname=Abacate&lastname=Ab&email=abacate@gmail.com
module.exports = router;