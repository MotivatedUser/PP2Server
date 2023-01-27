const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const forSaleSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    seller: {
        type: String,
        required: true
    },
    sellerContact: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    cut: {
        type: Number,
    },
    ready: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const ForSale = mongoose.model('ForSale', forSaleSchema);

module.exports = ForSale;