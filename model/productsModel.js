const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [
            true,
            'Product name is required'
        ],
        trim: true,
        minLength: [3, 'Product name must be at least 3 characters long'],
        maxLength: [100, 'Product name must not exceed 100 characters']
    },
    featured: {
        type: Boolean,
        default: false,
    },
    company: {
        type: String,
        required: [
            true,
            'Company name is required'
        ],
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
    },
    price: {
        type: Number,
        required: [
            true,
            'Product price is required'
        ],
        min: [0, 'Price must be a positive number']
    },
    rating: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must not exceed 5']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('product', productsSchema);