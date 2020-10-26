const {PythonShell} = require('python-shell');
const options = {
    mode: 'text',
    pythonPath: 'C:\\Users\\Marco Baratta\\AppData\\Local\\Programs\\Python\\Python37\\python.exe',
    args: ['./public/images/img.png', './points.json']
};

const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());
let file = [];


PythonShell.run('./Scripts/selectRect.py', options, function(err, result) {
    if (err) throw err;
});

