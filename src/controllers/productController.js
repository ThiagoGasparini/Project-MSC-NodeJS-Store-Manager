const productService = require('../services/productService');

const productController = {
  getAll: async (req, res) => {
    const result = await productService.getAll();
    return res.status(200).json(result);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const product = await productService.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product);
  },
};

module.exports = productController;
