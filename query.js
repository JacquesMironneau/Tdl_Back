const Pool = require("pg").Pool;
const pool = new Pool({
    user: "admin",
    host: "crabrave.ddns.net",
    database: "incredibledb",
    password: "admin",
    port: 5432,
});

const table = 'tdltask';

const add = (req, resp) => {
    console.log("ADD");
    console.log(req.query);
    const {content, isdone} = req.query;
    pool.query('INSERT INTO '+table+'(content, isdone) VALUES ($1, $2)', [content, isdone], (err, result) => {
        resp.header("Access-Control-Allow-Origin", "*");
        if (err)
            resp.status(200).json({"status": "FAILURE"});
        else
        {
            resp.status(201).json({"status": "SUCCESS"});
            console.log("Success");
        }
    })
};
const taskAll = (req, resp) => {
    console.log("TASKALL");
    resp.header("Access-Control-Allow-Origin", "*");

    pool.query("SELECT * FROM " + table, (err, result) => {

        if (err){
            resp.status(200).json({"status": "FAILURE"});
            console.log(err);
        }
      else
          resp.status(200).json(result.rows);
  })
};

const changeCheck = (req, resp) =>
{
    resp.header("Access-Control-Allow-Origin", "*");

    console.log("Change check");

    const {content, isdone} = req.query;
    pool.query("UPDATE " + table + " SET isdone = $1 WHERE content = $2", [isdone, content], (err, res) => {
        if (err)
        {
            resp.status(200).json({'status': 'FAILURE'});
            console.log(err);
        }
        else
            resp.status(200).json({'status': 'SUCCESS'});
    });
};

const deleteSingle = (req, resp) => {
    console.log("deleting there");
    resp.header("Access-Control-Allow-Origin", "*");

    const {content, isdone} = req.query;
    pool.query("DELETE from " + table + " where content = $1 AND isdone = $2", [content, isdone], (err, res) => {
        if (err)
        {
            resp.status(200).json({'status': 'FAILURE'});
            console.log(err);
        }
        else
            resp.status(200).json({'status': 'SUCCESS'});
    })
};
module.exports = {
    add,
    taskAll,
    changeCheck,
    deleteSingle,
};
