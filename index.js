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
app.get('/locales', async (request, response) => {
    const api_key = process.env.LOCALES_KEY
    const url = `https://spreadsheets.google.com/feeds/list/${api_key}/od6/public/values?alt=json`;
    $.getJSON(url, data => {
        console.log(data);
    })
    const response = await fetch(url);
    const data = await response.json();

    response.json(data);
    console.log(data);
})