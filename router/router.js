var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    //console.log(req.cookies.stage === '2');
    if (req.cookies.stage === '1')
        res.status(200).render('c');
    else if (req.cookies.stage === '2')
        res.status(200).render('l');
    else if (req.cookies.stage === '3')
        res.status(404);//TODO: Js page
    else if (req.cookies.stage === '4')
        res.status(404);//TODO: node page
    else if (req.cookies.stage === '5')
        res.status(404);//TODO: ranklist
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

router.get("*", function (req, res) {
    res.status(404).send('Sorry, we cannot find that!');
})

module.exports = router