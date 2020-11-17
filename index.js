

const express = require('express');

const app = express();

const courseData = require('./courseData.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/courseData', (req, res) => {
    res.json(courseData.getAllIDs());
    return;
});

app.get('/courseData/:id', (req, res) => {
    let b = courseData.findByID(req.params.id);
    console.log(req.params.id);
    if (b == null) {
        res.status(404).send("Course not found");
        return;
    }
    res.json(b);
});

app.post('/courseData', (req, res)=> {
    let {className, subject, courseNum, instructor} = req.body;

    let b = courseData.create(className, subject, courseNum, instructor);
    if (b == null) {
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(b);
});

app.put('/courseData/:id', (req, res) => {
    let b = courseData.findByID(req.params.id);
    if (b == null) {
        res.status(404).send("Book not found");
        return;
    }

    let {className, subject, courseNum, instructor} = req.body;
    b.className = className;
    b.subject = subject;
    b.courseNum = courseNum;
    b.instructor = instructor;
    b.update();

    res.json(b);
});

app.delete('/courseData/:id', (req, res) => {
    let b = courseData.findByID(req.params.id);
    if (b == null) {
        res.status(404).send("Course not found");
        return;
    }
    b.delete();
    res.json(true);
})

const port = 3030;
app.listen(port, () => {
    console.log("Course website up and running on port " + port);
});
