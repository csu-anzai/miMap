const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Starting server at ${port}`));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
})
app.get('/localesData', async (request, response) => {
    const api_key = '2PACX-1vSsOWCs5vSr5AKBFzDtkOzVfPFl3t3npUW1NP4wvEnZvgZmlz6uo59NuxHMf-kyAfewYr3wznkpFpw6';//process.env.LOCALES_KEY
    const url = `https://docs.google.com/spreadsheets/d/e/${api_key}/pub?output=csv`;
    const url_response = await fetch(url);
    const url_data = await url_response.text();

    response.send(url_data);
});