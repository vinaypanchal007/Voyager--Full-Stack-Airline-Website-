const mongoose = require('mongoose');

const AirportSchema = new mongoose.Schema({
    airport: { type: String, required: true }
});

module.exports = mongoose.model('Airport', AirportSchema, 'Airportdetails');
