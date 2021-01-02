const express = require("express");
const isEmpty = require("lodash/isEmpty");
const bodyParser = require("body-parser");
const app = express()
const port = 3005;

const { loginUser } = require("./src/business/loginUser");
app.use(bodyParser.json());
app.use(express.json({
    type: ['application/json', 'text/plain']
}));

app.get('/', (req,res) => {
    res.send('Welcome to First Responders Information Management System - FRIMS');
});

app.post('/api/loginUser', async (req,res) => {
    const { userName, password } = req.body;
    const userDetails = await loginUser({ userName, password });
    const statusCode = isEmpty(userDetails) ? 500 : 200;
    res.json({data: userDetails, statusCode});
});

app.listen(port, () => {
    console.log(`Server listening on the port: ${port}`);
});