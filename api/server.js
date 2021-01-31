const express = require("express");
const isEmpty = require("lodash/isEmpty");
const bodyParser = require("body-parser");
const app = express()
const port = 3005;

const { loginUser } = require("./src/business/loginUser");
const { registerUser } = require("./src/business/registerUser");
const { getUserPreferences } = require("./src/business/getUserPreferences");
const { saveUserPreferences } = require("./src/business/saveUserPreferences");
const Config = require("./env.json");
const axios = require("axios");


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

    res.json({data: { userDetails }, statusCode});
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

app.post('/api/getIncidents', async (req,res) => {
    const { locations, currentPage, type, pages } = req.body;
    const countQuery = 'select count(*) as totalCount';
    const countRequestURL = `${Config.TRAFFIC_API}?$query=${countQuery}`;
    const countResponse = await axios(countRequestURL);

    if (countResponse.status !== 200) {
        res.json({data: {}, statusCode: countResponse.status});
    } else {
        const totalCount = countResponse.data[0].totalCount;
        const pageLimit = Config.PAGE_LIMIT;
        let incidentDetails = { totalCount, pageLimit };
        let noOfPages = 9;
        let returnPages = type === 'page' ? pages : [];

        if (type !== "page") {
            if (type !== "last") {
                if (totalCount < (pageLimit * (currentPage + noOfPages))) {
                    noOfPages = Math.ceil(totalCount - (pageLimit * (currentPage-1)) / pageLimit);
                }
                for (let ctr = currentPage; ctr <= (currentPage + noOfPages); ctr++) {
                    returnPages.push(ctr);
                }
            } else {
                if (currentPage > (noOfPages + 1)) {
                    for (let ctr = (currentPage - noOfPages); ctr <= currentPage; ctr++) {
                        returnPages.push(ctr);
                    }
                } else {
                    for (let ctr = 1; ctr <= currentPage; ctr++) {
                        returnPages.push(ctr);
                    }
                }
            }
        }

        const offset = ((currentPage || 1) - 1) * 10;
        const incidentsRequestURL = `${Config.TRAFFIC_API}?$order=\`traffic_report_status_date_time\`+DESC&$limit=${pageLimit}&$offset=${offset}`;
        const incidentsResponse = await axios(incidentsRequestURL);

        if (incidentsResponse.status === 200) {
            incidentDetails.currentPage = currentPage;
            incidentDetails.pages = returnPages;
            incidentDetails.incidents = incidentsResponse.data;
        }
        res.json({data: { incidentDetails }, statusCode: incidentsResponse.status});
    }
});

app.listen(port, () => {
    console.log(`Server listening on the port: ${port}`);
});