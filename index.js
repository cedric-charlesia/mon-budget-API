require('dotenv').config();

const express = require('express');
const app = express();

const router = require('./app/router');

const port = process.env.PORT || 5000;

const cleaner = require('./app/middlewares/cleaner')

app.use(cleaner);

app.use(express.json());

app.use(router);

app.use((_, response) => {
  response.status(404).json({ error: 'Error 404, nothing here!' })
})

app.listen(port, () => {
  console.log(`App is listenning on http://localhost:${port}`)
})

