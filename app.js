// app.js

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const Server = require('./models/server');

const ser = new Server();

// Configura body-parser para aumentar el límite de tamaño
ser.app.use(bodyParser.json({ limit: '50Gb' }));
ser.app.use(bodyParser.urlencoded({ limit: '50Gb', extended: true }));

ser.listen();
