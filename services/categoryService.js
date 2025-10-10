import DuplicateEntryException from '../exception/duplicateEntryException.js';
import InputValidationException from '../exception/inputValidationException.js';
import asyncWrapper from '../helper/asyncWrapper.js';
import { Category } from '../model/categoryModel.js';

const getCategoris = async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({ categories });
}

const createCategory = asyncWrapper(async (req, res) => {
    const name = req.body.name;
    try {
        const category = await Category.create({ name, image: '' });
        res.status(201).json({ 'message': 'Category created successfully', category });
    } catch (err) {
        if (err.code === 11000 || err.code === 11001) {
            throw new DuplicateEntryException(`Category with name "${name}" already exists`);
        }
        if (err && err.name === 'ValidationError') {
            // split the validation message by ':' and take the last part
            const parts = String(err.message).split(':');
            const message = parts[parts.length - 1].trim();
            throw new InputValidationException(message);
        }
        throw new Error('Something went wrong');
    }

});
export { getCategoris, createCategory };