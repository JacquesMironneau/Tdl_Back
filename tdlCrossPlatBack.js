const express = require('express');

const app = express();
const bodyParser = require("body-parser");
const apiPath = '/api-tdl/';
const db = require('./query.js');

app.get('/',  (req, res) => {
    res.send('Hello tdl');
});

//TODO move some request type to post (i think xd) iiii
app.get(apiPath+"add", db.add);

app.get(apiPath+"taskAll", db.taskAll);

app.get(apiPath+"changeCheck", db.changeCheck);

app.get(apiPath+"deleteSingle", db.deleteSingle);

app.listen(80);

