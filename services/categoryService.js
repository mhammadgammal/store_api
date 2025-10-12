import DuplicateEntryException from '../exception/duplicateEntryException.js';
import InputValidationException from '../exception/inputValidationException.js';
import NotFoundException from '../exception/notFoundExeption.js';
import asyncWrapper from '../helper/asyncWrapper.js';
import { Category } from '../model/categoryModel.js';

const getCategoris = asyncWrapper(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * limit;

        const categories = await Category.find().skip(skip).limit(limit);
        res.status(200).json({ status: 'success', categories });
    } catch (err) {
        throw new Error(err.message || 'Something went wrong');
    }
})

const getCategoryById = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    // fetch the document
    const category = await Category.findById(id);
    // if no document found, throw an error so the global handler can respond (404)
    if (!category) {
        throw new NotFoundException(`Category with id "${id}" not found`);
    }
    res.status(200).json({ status: 'success', category });
});

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

const updateCategory = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        console.log(`id parameter: ${id}`);
        console.log(`name in body: ${name}`);

        validate(name);
        const category = await Category.findByIdAndUpdate(id, { name }, { runValidators: true });
        if (!category) {
            throw new NotFoundException(`Category with id "${id}" not found`);
        }
        res.status(200).json({ status: 'success', category });
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
        throw new Error(`Something went wrong, ${err.message}`);
    }
});

const deleteCategory = asyncWrapper(async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            throw new NotFoundException(`Category with id "${id}" not found`);
        }
        res.status(200).json({ status: 'success', message: 'Category deleted successfully' });
    } catch (err) {
        throw new Error(`Something went wrong, ${err.message}`);
    }
});
function validate(name) {
    if (!name || name.trim() === '') {
        throw new InputValidationException('Category name is required');
    }
}
export { getCategoris, getCategoryById, createCategory, updateCategory, deleteCategory };