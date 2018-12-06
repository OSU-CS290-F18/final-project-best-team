var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

var dbInfo = JSON.parse(fs.readFileSync("db.json"));
var host = dbInfo.host;
var username = dbInfo.username;
var password = dbInfo.password;
var name = dbInfo.name;
var collection_n = dbInfo.collection;

console.log(dbInfo.password);
var dbURL = "mongodb+srv://" + username + ":" + password + "@" + host;
console.log(dbURL);
mdb = {
    createDB : () => {
        MongoClient.connect(dbURL, function (err, db) {
            if (err) throw err;
            console.log("Database created.");
            var dbase = db.db(name);
            dbase.createCollection(collection_n, (err, res) => {
                if (err) throw err;
                console.log("ranklist created.");
                db.close();
            });
        });
    },


    writeRecord : (user) => {
         ;
        MongoClient.connect(dbURL, function (err, db) {
            if (err) throw err;
            //console.log("Database connectted.");
            var dbase = db.db(name);
            var uobj = {
                uname: user.name,
                time: user.time
            }
            dbase.collection(collection_n).insertOne(uobj, (err, res) => {
                if (err) throw err;
                //console.log("user info inserted.");
                db.close();
            });
        });
    },

    getRankList : (list) => {
         
        MongoClient.connect(dbURL, function (err, db) {
            if (err) throw err;
            var dbase = db.db(dbInfo.name);
            var rankSort = { time: 1 }; //Ascending according to time
            dbase.collection(collection_n).find().sort(rankSort).toArray((err, result) => {
                if (err) throw err;
                db.close();
                console.log(result);
                list = result;
            });
        });
    },

    delete_user: (user) => {
        MongoClient.connect(dbURL, function (err, db) {
            if (err) throw err;
            var dbase = db.db(dbInfo.name);
            var where = { uname: user.name }; 
            dbase.collection(collection_n).deleteOne(where, (err, obj) =>{
                if (err) throw err;
                
                db.close();
            });
        });
    }
}

module.exports = mdb;