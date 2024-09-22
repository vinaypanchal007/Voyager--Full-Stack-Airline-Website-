const mongoose = require('mongoose');

const RoutesSchema = new mongoose.Schema({
    from : { type: String, required: true },
    to : { type: String, required: true },
    depTime : { type: String, required: true },
    economyPrice : { type: Number, required: true },
    businessPrice : { type: Number, required: true },
    firstClassPrice : { type: Number, required: true}
});

module.exports = mongoose.model('Routes', RoutesSchema, 'Routesdetails');
