const { modeloProductos } = require('../dao/models/productos.modelo'); 
const ProductService = require('../services/product.service');
const ProductDTO = require('../dto/product.dto');

class ProductController{
    static async getAllProducts(req, res) {
        try {
            const { page = 1, limit = 2 } = req.query;
            const options = {
                page: parseInt(page),
                limit: parseInt(limit)
            };
            const products = await modeloProductos.paginate({}, options);
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getProductById(req, res) {
        const productId = req.params.id;
        try {
            const product = await ProductService.getProductById(productId);
            res.json(product);
        } catch (error) {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    }

    static async createProduct(req, res) {
        try {
            const productData = new ProductDTO(req.body);
            const newProduct = await ProductService.addProduct(productData);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateProduct(req, res) {
        const productId = req.params.id;
        const updatedFields = req.body;

        try {
            const updatedProduct = await ProductService.updateProduct(productId, updatedFields);
            res.json(updatedProduct);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async deleteProduct(req, res) {
        const productId = req.params.id;
        try {
            await ProductService.deleteProduct(productId);
            res.json({ message: 'Producto eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProductController;