const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const io = require('socket.io').listen(server);
const dotenv = require('dotenv');

// Configuer dotenv
dotenv.config();

// importation du module schema
const schema = require('./graphql/schema');

// Pour prevenir les erreur de CORS
app.use(cors());

// Pour utiliser graphql et graphiql
app.use('/graphql', expressGraphQL({
    graphiql: true,
    schema
}))

// Connection à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB'))
    .catch(e => console.error('Not connected to DB', e));

// socket
let passengerSocket; // le socket du passager
let taxiSocket; // le socket du taxi

// pour savoir si la demande du taxi a deja été envoyé au taxi
let hasRequestATaxi;

// les infos du passager
let passInfo;

// Au cas où le passager se connecte en premier
function requestATaxi(taxi, info) {
    return new Promise((resolve, reject) => {
        if(taxi) {
            taxi.emit('requestTaxi', info);
            resolve(true);
        } else {
            reject("Ejected");
        }
    });
}
io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('requestTaxi', passengerInfo => {
        console.log('someone is looking for a taxi');
        // on obtient et stocke la reference du socket du passager
        passengerSocket = socket;
        passInfo = passengerInfo;
        if(taxiSocket) {
            taxiSocket.emit('requestTaxi', passengerInfo);
            hasRequestATaxi = true;
        } else {
            hasRequestATaxi = false;
        }
    });
    socket.on('requestPassenger', async taxiLocation => {
        console.log('someone is looking for a passenger');
        // on obtient et stocke la reference du socket du taxi
        taxiSocket = socket;

        if(passengerSocket && hasRequestATaxi) {
            // le passager a dejà envoyé sa requette au taxi
            console.log('1ère condition');
            passengerSocket.emit('requestPassenger', taxiLocation);
        } else if(passengerSocket && !hasRequestATaxi && passInfo) {
            // le passager n'a pas encore evonyé sa requette au taxi
            console.log('2è condition');
            await requestATaxi(taxiSocket, passInfo);
            passengerSocket.emit('requestPassenger', taxiLocation);
        } else {
            console.log('else condition');
        }
    });
});

// lancer le serveur sur le port 4000
server.listen('4000', () => {
    console.log('App listening on Port 4000');
});