const Pool = require("pg").Pool;
const mysql = require('mysql');
const pool = mysql.createConnection({
    host: 'gigondas',
    user: 'mironnej',
    password: 'mironnej',
    database: 'mironnej'
});

pool.connect();
const poola = new Pool({
    user: "admin",
    host: "crabrave.ddns.net",
    database: "incredibledb",
    password: "admin",
    port: 5432,
});
const poolb = new Pool({
    user: "mironnej",
    host: "gigondas",
    database: "mironnej",
    password: "mironnej",
    port: 5432,
})

const table = 'tdl_task';

const add = (req, resp) => {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Content-Type", "application/json");
    //req.header("Content-Type", "application/json");
    console.log("ADD");
   console.log(req.body);
    //console.log(req.headers);

    //console.log(req);
    const {name, details, deadline, whendo, timeneeded, category_name} = req.body;
   pool.query('INSERT INTO '+ table + ' (name, details, deadline, whendo, timeneeded, category_name) values ($1, $2, $3, $4, $5, $6)', [name, details, deadline, whendo, timeneeded, category_name], (err, result) => {
           if (err)
           {
               resp.status(400);
               console.log(err.detail);
           }
           else
           {
               resp.status(201).json({"status": "SUCCESS"});
               console.log("Success");
           }
   });
};

//Called by /api-tdl/getAllSorted?orderby=[id/whendo...]
const taskAll = (req, resp) => {
    resp.header("Access-Control-Allow-Origin", "*");
    let {orderby} = req.query;
    console.log("[GET ALL TASKS] sorted by :");
    console.log(orderby);

    orderby = 'id';
    pool.query("SELECT * FROM " + table + " ORDER BY "+orderby,(err, result) => {
        if (err){
            resp.status(400).json({"status": "FAILURE"});
            console.log(err);
            console.log("[QUERY-STATE]: FAILURE");
        }
      else
        {
            resp.status(200).json(result.rows);
            console.log(result.rows);
            console.log("[QUERY-STATE]: SUCCESS");
        }
  })
};
const update = (req, resp) =>
{
    resp.header("Access-Control-Allow-Origin", "*");
    console.log("Change check");
    const {name, details, deadline, whendo, timeneeded, category_name, id} = req.body;
    pool.query("UPDATE " + table + " SET name = $1, details = $2, deadline = $3, whendo = $4, timeneeded = $5, category_name = $6 WHERE id = $7", [name, details, deadline, whendo, timeneeded, category_name, id], (err, res) => {
        if (err)
        {
            resp.status(400).json({'status': 'FAILURE'});
            console.log(err);
        }
        else
            resp.status(200).json({'status': 'SUCCESS'});
    });
};

const deleteSingle = (req, resp) => {
    console.log("deleting there");
    resp.header("Access-Control-Allow-Origin", "*");

    const {id} = req.body;
    pool.query("DELETE from " + table + " where id = $1", [id], (err, res) => {
        if (err)
        {
            resp.status(400).json({'status': 'FAILURE'});
            console.log(err);
        }
        else
            resp.status(200).json({'status': 'SUCCESS'});
    })
};
module.exports = {
    add,
    taskAll,
    update,
    deleteSingle,
};
