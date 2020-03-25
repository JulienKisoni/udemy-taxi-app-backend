const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const socket = require('socket.io');
require('dotenv').config();

app.use(cors);

app.listen('4000', () => {
    console.log('app listening on port 4000');
});