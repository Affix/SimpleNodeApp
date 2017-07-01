
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')


MongoClient.connect('mongodb://localhost/test-quotes-app', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, function(){
    console.log("Application started on Port 3000");
    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray((err, results) => {
        if(err) return console.log(err);
        console.log(results);
        res.render('index', {quotes: results});
      });
      //res.send('error!');
    });

    app.get('/quotes', (req, res) => {

    });

    app.post('/quotes', (req, res) => {
      db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
      });
    });
  });
});
