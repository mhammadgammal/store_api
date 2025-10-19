import mongoose, { Mongoose, Schema, model } from 'mongoose';

const brandSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Brand name is required'],
        trim: true,
        minLength: [2, 'Brand name must be at least 2 characters long'],
        maxLength: [50, 'Brand name must not exceed 50 characters'],
        unique: true,
    },
    image: String,
});

const Brand = model('Brand', brandSchema);

// Export the model as default and expose commonly used model static helpers as named exports
export default Brand;