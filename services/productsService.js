import asyncWrapper from "../helper/asyncWrapper.js";
import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from '../model/productsModel.js';

const getAllProducts = asyncWrapper(async (req, res) => {
    const products = await find();
    res.status(200).json({
        status: 'success',
        products
    });
});

const getProductById = asyncWrapper(
    async (req, res) => {
        const id = req.params.id;
        const product = await findById(id);
        res.status(200).json({
            status: 'success',
            product
        })
    }
);

const search = asyncWrapper(async (req, res) => {
    const { name } = req.query;
    const filteredProducts = await find({
        name: name
    })
    res.status(200).json({
        status: 'success',
        products: filteredProducts
    })
});

const createProduct = asyncWrapper(
    async (req, res) => {
        const product = await create(req.body)
        res.status(201).json({
            status: 'success',
            product
        });
    }
);

const updateProduct = asyncWrapper(
    async (req, res) => {
        const id = req.params.id;
        console.log(`Updating product with ID: ${id}`);
        console.log(`Request body: ${JSON.stringify(req.body)}`);

        const product = await findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            product
        });
    }
);

const deleteProduct = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    await findByIdAndDelete(id);
    res.status(200).json({
        sttatus: 'success',
        message: 'Product deleted successfully'
    });
})

export {
    getAllProducts,
    getProductById,
    search,
    createProduct,
    updateProduct,
    deleteProduct
}