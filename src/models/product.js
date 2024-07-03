const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

productSchema.pre('save', async function (next) {
    if (!this.owner) {
        const User = require('./user');
        const admin = await User.findOne({ role: 'admin' });
        this.owner = admin._id;
    }
    next();
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
