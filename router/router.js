var express = require('express');
var mdb = require('../models/dbhelper')
var router = express.Router();

router.get('/', (req, res, next) => {
    //console.log(req.cookies.stage === '2');
    if (req.cookies.stage === '1')
        res.status(200).render('c');
    else if (req.cookies.stage === '2')
        res.status(200).render('l');
    else if (req.cookies.stage === '3')
        res.status(200).render('level3');
    else if (req.cookies.stage === '4') {
        var users;
        var player = { name: "", time: Infinity };
        player.time = parseInt(new Date(Date.now()) - new Date(req.cookies.startTime)) / 1000 / 60;
        player.time.toFixed(2);
        player.name = req.cookies.name;
        var massage = "";
        mdb.getRankList((result) => {
            users = result;
            if (users[9]) {
                console.log('users[9] pass');
                if (users[9].time > player.time) {
                    console.log('users[9].time > player.name');
                    mdb.delete_user(users[9]);

                    mdb.writeRecord(player, () => {
                        massage = "You passed the game and entered the top ten.";
                        mdb.getRankList((sortedresult) => {


                            var in_users = sortedresult;
                            var data = { "users": in_users, time: player.time, msg: massage };
                            res.status(200).render("ranklist", data);
                        });
                    });

                }
                else {
                    massage = "You passed the game but you are slower than top ten, the data will not be stored.";
                    var data = { "users": users, time: player.time, msg: massage };
                    res.status(200).render("ranklist", data);
                }
            }
            else {
                mdb.writeRecord(player, () => {
                    massage = "You passed the game and entered the top ten.";
                    mdb.getRankList((sortedresult) => {
                        var in_users = sortedresult;

                        var data = { "users": in_users, time: player.time, msg: massage };
                        res.status(200).render("ranklist", data);
                    });
                });

            }
            res.clearCookie("name");
            res.clearCookie("stage");
            res.clearCookie("startTime");
        });

    }
    else if (req.cookies.stage === '5')
        res.status(404).send();//TODO: ranklist
    else
        res.status(200).render('index');
});

router.post('/', (req, res) => {
    var uname = '';
    req.on('data', (reqData) => {
        uname = JSON.parse(reqData).uname;
        console.log("name:" + uname);
        res.cookie("name", uname, { expires: new Date(Date.now() + 7200000) });
        res.cookie("stage", 1);
        res.cookie("startTime", new Date(Date.now()))
        res.send();
    });

});

router.get('/goto/l', (req, res) => {
    //console.log(req.cookies.stage);
    if (req.cookies.stage != 1)
        res.status(404).send("not found");
    else if (req.cookies.stage === '1') {
        console.log('hit');
        res.cookie("stage", 2);
        res.send("you got the key and go back");
    }

});

router.get('/jspart', (req, res) => {
    if (req.cookies.stage != 2)
        res.status(404).send("not found");
    else if (req.cookies.stage === '2') {
        console.log('hit');
        res.cookie("stage", 3);
        res.redirect('/');
    }
})

router.get('/clicked', (req, res) => {
    if (req.cookies.stage != 3)
        res.status(404).send("not found");
    else if (req.cookies.stage === '3') {
        console.log('hit');
        res.cookie("stage", 4);
        res.send();
    }
});

router.get("*", function (req, res) {
    res.status(404).send('Sorry, we cannot find that!');
})

module.exports = router