import { Schema, model } from 'mongoose';

const productsSchema = new Schema({
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

const Product = model('product', productsSchema);

// Export the model as default and expose commonly used model static helpers as named exports
export default Product;

export const find = (...args) => Product.find(...args);
export const findById = (id) => Product.findById(id);
export const create = (doc) => Product.create(doc);
export const findByIdAndUpdate = (id, update, options) => Product.findByIdAndUpdate(id, update, options);
export const findByIdAndDelete = (id) => Product.findByIdAndDelete(id);