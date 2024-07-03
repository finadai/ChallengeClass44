const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    code: { type: String, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: Number,
    purchaser: String,
});

ticketSchema.pre('save', function (next) {
    this.code = `TCKT-${Date.now()}`;
    next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
