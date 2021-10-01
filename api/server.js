const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

//routes
const usersRoutes = require('./routes/users.js')
const habitsRoutes = require('./routes/habits.js')
server.use('/users', usersRoutes)
server.use('/habits', habitsRoutes)

server.get('/', (req, res) => {res.send("Welcome!")});

module.exports = server;