const express = require('express');
const port = 51002;
const app = express();
const bodyParser = require("body-parser");
const apiPath = '/api-tdl/';
const db = require('./query.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true,
    }),
);

app.get('/',  (req, res) => {
    res.send('Hello tdl');
});

app.get(apiPath+"getAllSorted", db.taskAll);

//TODO remove: (deprecated)
//app.post(apiPath+"add", db.add);
app.get(apiPath+"update", db.update);

app.get(apiPath+"delete", db.deleteSingle);

//New request
app.post(apiPath+"add", db.add);

app.put(apiPath+"update", db.update);

app.delete(apiPath+'delete', db.deleteSingle);

app.listen(port, () => console.log(`Server is running on ${port}`));

