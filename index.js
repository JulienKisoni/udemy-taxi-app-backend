const express = require('express');
const app = express();
const http = require('http').createServer(app);
const mongoose = require('mongoose');
const cors = require('cors');
const socket = require('socket.io')(http);
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB'))
    .catch(e => console.error('Not connected to DB', e));

app.listen('4000', () => {
    console.log('App listening on Port 4000');
});