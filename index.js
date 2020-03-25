const express = require('express');
const app = express();
const http = require('http').createServer(app);
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const socket = require('socket.io')(http);
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

// lancer le serveur sur le port 4000
app.listen('4000', () => {
    console.log('App listening on Port 4000');
});