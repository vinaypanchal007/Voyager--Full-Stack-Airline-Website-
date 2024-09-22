const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    dateFrom: { type: String, required: true },
    depTime: { type: String, required: true },
    ecocount: { type: Number, required: true },
    bizcount: { type: Number, required: true },
    firstcount: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    voyagerPlus: { type: Boolean, required: true },
    selectedSeats: { type: [String], required: true }
});

module.exports = mongoose.model('Ticket', TicketSchema, 'tickets');
