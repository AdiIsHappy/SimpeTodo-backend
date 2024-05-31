const express = require('express');
const path = require('path')
const cors = require('cors');
const tasks = require('./routes/tasks')

const app = express();
app.use(cors());

app.use(express.json())

app.use(tasks)

app.listen(3003)