const productModel = require('../models/productModel');

const productService = {
  getAll: async () => {
    const product = await productModel.getAll();
    return product;
  },

  getById: async (id) => {
    const product = await productModel.getById(id);
    if (!product) return null;
    return product;
  },
};

module.exports = productService;