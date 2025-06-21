const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());

// create application/json parser
const jsonParser = bodyParser.json()
app.use(jsonParser);

app.get('/', (_, res) => res.send('Hello World!'));

app.use('/api/articles', require('./articles'));

app.listen(3000, () => console.log('App Server listening on port 3000!'));
