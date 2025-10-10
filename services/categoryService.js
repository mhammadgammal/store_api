import asyncWrapper from '../helper/asyncWrapper.js';
import { Category } from '../model/categoryModel.js';

const getCategoris = async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({ categories });
}

const createCategory = asyncWrapper(async (req, res) => {
    const name = req.body.name;
    Category.create({ name, image: '' }).then((
        category
    ) => res.status(201).json({
        status: 'success',
        category
    })).catch((err) => {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    });
});
export { getCategoris, createCategory };