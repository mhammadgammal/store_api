import asyncWrapper from "../helper/asyncWrapper.js";
import DuplicateEntryException from "../exception/duplicateEntryException.js";
import Brand from "../model/brandModel.js";
const getBrands = asyncWrapper(async (req, res) => {
    const brands = await Brand.find();
    res.status(200).json({ status: 'success', 'data': brands });
});

const getBrandById = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) {
        throw new NotFoundException(`Brand with id "${id}" not found`);
    }
    res.status(200).json({ status: 'success', 'data': brand });
});

const createBrand = asyncWrapper(async (req, res) => {
    const { name } = req.body;
    try {

        const brand = await Brand.create({ name });
        res.status(201).json({ status: 'success', message: 'Brand created successfully', brand });
    } catch (err) {
        console.log(`create brand error: ${err.code}`);

        if (err.code === 11000 || err.code === 11001) {
            throw new DuplicateEntryException(`Brand with name "${name}" already exists`);
        }
        if (err && err.name === 'ValidationError') {
            throw new InputValidationException(err.message);
        }
        throw new Error('Something went wrong');
    }
});

const updateBrand = asyncWrapper(async (req, res) => {

    const { id } = req.params;
    const { name } = req.body;
    const brand = await Brand.findByIdAndUpdate(id, { name }, { new: true });
    if (!brand) {
        throw new NotFoundException(`Brand with id "${id}" not found`);
    }
    res.status(200).json({ status: 'success', message: 'Brand updated successfully', brand });
});

const deleteBrand = asyncWrapper(async (req, res) => {
    const { id } = req.params;

    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
        throw new NotFoundException(`Brand with id "${id}" not found`);
    }
    res.status(200).json({ status: 'success', message: 'Brand deleted successfully' });
});
export { getBrands, getBrandById, createBrand, updateBrand, deleteBrand };