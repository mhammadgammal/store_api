const asyncWrapper = require("../helper/asyncWrapper");
const productModel = require('../model/productsModel');

const getAllProducts = asyncWrapper(async (req, res) => {
    const products = await productModel.find();
    res.status(200).json({
        status: 'success',
        products
    });
});

const getProductById = asyncWrapper(
    async (req, res) => {
        const id = req.params.id;
        const product = await productModel.findById(id);
    }
);

const search = asyncWrapper(async (req, res) => {
    const { name, category } = req.query;
    res.status(200).json({
        status: 'success',
        message: `Search results for name: ${name} and category: ${category}`
    })
});

const createProduct = asyncWrapper(
    async (req, res) => {
        res.status(500).json({
            status: 'error',
            message: 'This route is not implemented yet'
        });
    }
);

const updateProduct = asyncWrapper(
    async (req, res) => {
        res.status(500).json({
            status: 'error',
            message: 'This route is not implemented yet'
        });
    }
);

const deleteProduct = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    await productModel.findByIdAndDelete(id);
    res.status().json({
        sttatus: 'success',
        message: 'Product deleted successfully'
    });
})

module.exports = {
    getAllProducts,
    getProductById,
    search,
    createProduct,
    updateProduct,
    deleteProduct
}