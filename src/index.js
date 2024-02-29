const express = require("express");
const path = require('path');
const mysql = require("mysql");
const env = require("dotenv");

env.configDotenv({path: './.env'});

const app = express();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    databse: process.env.DATABASE
})

//__dirname gives acces to the current directory
const publicDirectory = path.join(__dirname, '/public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

db.connect( (error) => {
    if(error){
        console.log(error);
    } else {
        console.log('MYSQL Connected...');
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(5001, () => {
    console.log('Server started on Port 5001');
});