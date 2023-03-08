//Importing required libs
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const port = 9999;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
  
//Set Database Connection and check if works
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'devuser',
    password: 'ElaBanana1',
    database: "cfmeu"
});

connection.connect((err) => {
    if(err) throw(err);
    console.log('mySQL been connected to the app');
})


//CRUD SECTION API

// Get all users
app.get('/users/', (req, res) => {
    const allUsers = 'SELECT * FROM users'

    connection.query(allUsers, function (err, result){
        if(err) throw(err)
        res.send(result)
    })
});


//New user
app.post('/new/user', (req, res) => {
    const data = {id: req.body.id, name: req.body.name, status: req.body.status }
    

    const newUser = `INSERT INTO users (id, name, status) VALUES('${data.id}', '${data.name}', '${data.status}')`;

    connection.query(newUser, data, function(err, result){
        if(err) throw(err)
        res.send(console.log('added new user sucessfully'));
        
    });
});


// All meetings 
app.get('/meeting/', (req, res) => {
    const allMeeting = 'SELECT * FROM meetings'

    connection.query(allMeeting, function(err, result){
        if(err) throw(err)
        res.send(result,)
    })
})

//Select meeting by date
app.get('/meeting/:date', (req, res) => {
    console.log(date)
    const selectMeeting = `SELECT * FROM meetings WHERE date=${date}`

    connection.query(selectMeeting, function(err, result){
        if(err) throw(err)
        res.send(result)
    })
})


//New meeting
app.post('/meetings/new', (req, res) => {
    const date =  req.body.date              //DATE MUST BE INSTERTED IN YYYY-MM-DD
    console.log(date);
    const newMeeting = `INSERT INTO meetings (date) values ('${date}')`;

    connection.query(newMeeting, function(err, result){
        if(err) throw(err)
        res.send(console.log('new meeting sucesfully added to Database'))
    })
})


//Select user by card number 
app.get('/users/:id', (req, res) => {
    const id = `"${req.params.id}"`;
    const selectUserById = `SELECT * FROM users WHERE id=${id}`  

     connection.query(selectUserById, function(err, result){
        if(err) throw(err)
        res.send(result)
     })
})

//Select user by name 
app.get('/users/name/:name', (req, res) => {
    const name = `"${req.params.name}"`;
    const selectUserByname = `SELECT * FROM users WHERE name=${name}`;

    connection.query(selectUserByname, function(err, result){
        if(err)throw(err)
        res.send(result)
    })
})

//Select by status
app.get('/users/status/:status', (req, res) => {
    const status = `"${req.params.status}"`;
    const selectActiveUsers = `SELECT * FROM users WHERE status = ${status}`

    connection.query(selectActiveUsers, function(err, result){
        if(err)throw(err)
        res.send(result)
    });
})



//Delete an user by id
app.delete('/delete/user/', (req, res)=>{
    const id = req.body.id
    const deleteUser = `DELETE FROM users WHERE id= "${id}"`;

    connection.query(deleteUser, function (err, result){
        if(err)throw(err)
        res.send(console.log('union member deleted sucessfully'));
    })
})

//Delete a meeting 
app.delete('/delete/meeting', (req, res) => {
    const date = req.body.date
    const deleteMeeting = `DELETE FROM meetings WHERE date ='${date}'`

    connection.query(deleteMeeting, function(err, result){
        if(err)throw(err)
        res.send(console.log('meeting deleted sucessfully'));
    })
})

//Update user name 
app.put('/users/:id', (req, res) => {
    const delegate = `'${req.body.id}'`
    const newName = `'${req.body.name}'`
    console.log(delegate, newName)
    const updateName = `UPDATE users SET name = ${newName} WHERE id=${delegate}`;

    connection.query(updateName, function(err, result){
        if(err)throw(err)
        res.send(console.log('name changed'));
    });
});

//Update user financial status 
app.put('/users/financial/:id', (req, res) => {
    const delegate = `'${req.body.id}'`
    const newStatus = `'${req.body.status}'`
    const setInactive = `UPDATE users SET status = ${newStatus} WHERE id=${delegate}`;

    connection.query(setInactive, function(err, result){
        if(err)throw(err)
        res.send(console.log('changed financial status!'));
    });
});


//DEV
app.listen({port}, () => {
    console.log(`Server up and running on port ${port}`);
});