const express = require('express')
const app = express()
const bodyPaser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')


const db = mysql.createPool({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'bf8c7495928090',
    password: '0e1fb574',
    database: 'heroku_19d36b0eca32e82'
});

app.use(cors())
app.use(express.json())
app.use(bodyPaser.urlencoded({ extended: true }));

app.get('/api/get/email', (req, res) => {
    const sqlSelect = "SELECT * FROM email_id";

    db.query(sqlSelect, (err, result) => {
        console.log(result)
        res.send(result)
    });
})

app.get('/api/get/interview', (req, res) => {
    const sqlSelect = "SELECT * FROM Schedule";

    db.query(sqlSelect, (err, result) => {
        console.log(result)
        res.send(result)
    });
})

app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id
    const sqlDelete = "DELETE FROM Schedule WHERE idSchedule = ?";
    db.query(sqlDelete,id,(error, result) => {
        res.send(result)
        console.log(error)
    })
})

app.post("/api/insert", (req, res) => {
    const idSchedule = req.body.idSchedule
    const date = req.body.date
    const startTime = req.body.startTime
    const endTime = req.body.endTime
    const participants = req.body.participants
    const sqlInsert = "INSERT INTO Schedule (idSchedule, date, startTime, endTime, participants) VALUES(?,?,?,?,?)"

    db.query(sqlInsert, [idSchedule, date, startTime, endTime, participants], (err, result) => {
        console.log(err)
        res.send(result)
    });
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port`);
});