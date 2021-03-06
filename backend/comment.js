const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')
require('dotenv/config');

app.use(bodyParser.json());
app.use(cors());
const postRoute = require('./posts');
const accountRoute = require('./accounts')
app.use('/post', postRoute);
app.use('/account', accountRoute)


mongoose.connect(
                process.env.DB_CONNECTION, 
                { useNewUrlParser: true }, 
                () => {
                    console.log('connected to DB!');
})

app.listen(3010);


