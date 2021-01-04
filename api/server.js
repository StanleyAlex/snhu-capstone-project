const express = require("express");
const isEmpty = require("lodash/isEmpty");
const bodyParser = require("body-parser");
const app = express()
const port = 3005;

const { loginUser } = require("./src/business/loginUser");
const { registerUser } = require("./src/business/registerUser");
const { getUserPreferences } = require("./src/business/getUserPreferences");
const { saveUserPreferences } = require("./src/business/saveUserPreferences");


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

app.post('/api/registerUser', async (req,res) => {
    const { registrationDetails } = req.body;
    let statusCode = 200;
    let errorMessage, errorCode;

    try {
        const result = await registerUser({ registrationDetails });
    } catch (error) {
        statusCode = 500;
        errorCode = error.code;
        errorMessage = error.sqlMessage;
    }
    res.json({ statusCode, errorCode, errorMessage });
});

app.post('/api/getUserPreferences', async (req,res) => {
    const { userId } = req.body;
    const userPreferences = await getUserPreferences({ userId });
    const statusCode = isEmpty(userPreferences) ? 500 : 200;
    res.json({data: userPreferences || {}, statusCode});
});

app.post('/api/saveUserPreferences', async (req,res) => {
    const { userId, userPreferences } = req.body;
    let statusCode = 200;
    let errorMessage, errorCode;

    try {
        const result = await saveUserPreferences({ userId, userPreferences });
    } catch (error) {
        statusCode = 500;
        errorMessage = error.sqlMessage;
    }
    res.json({ statusCode, errorMessage });
});

app.listen(port, () => {
    console.log(`Server listening on the port: ${port}`);
});