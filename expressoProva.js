const express = require('express');
const Joi = require('joi');
const multer = require('multer');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(express.json());



const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'}
];
function validate(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}
app.get('/', function (req, res) {
    res.sendFile(__dirname+'/image2.html');

});
app.get('/api/courses', function (req, res) {
    res.send(courses);

});
//PORT
app.get('/api/courses/:id', function (req, res) {
    const course = courses.find(function (c) {
         return c.id === parseInt(req.params.id)
    });
    if (!course) res.status(404).send('Not found');
    else res.send(course);
 });

app.put('/api/courses/:id', function (req,res) {
    const course = courses.find(function (c) {
        return c.id === parseInt(req.params.id)
    });
    if (!course) return res.status(404).send('Not found');
    const {error} = validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course);


});

app.post('/api/courses/', function (req, res) {

    const {error} = validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course); //convention in http
});

app.delete('/api/courses/:id', function (req, res) {
    const course = courses.find(function (c) {
        return c.id === parseInt(req.params.id)
    });
    if (!course) return res.status(404).send('Not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

const port = process.env.PORT || 3000;
http.listen(port, function () {
    console.log(`Listening to ${port}...`)
});

