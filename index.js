require('dotenv').config();

const express = require('express');

const port = process.env.PORT || 5000;

const app = express();

app.get('/', (request, response) => {
    response.json('Hello world!')
})

app.listen(port, () => {
    console.log(`App is listenning on http://localhost:${port}`)
})

