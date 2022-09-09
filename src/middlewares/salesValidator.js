const productService = require('../services/productService');
const salesSchema = require('./salesSchema');

const salesMiddleware = (req, res, next) => {
  const product = [...req.body];
  const { error } = salesSchema.validate(product);
  if (error) {
    const [code, message] = error.message.split('|');
    console.log(error);
    return res.status(Number(code)).json({ message });
  }
  next();
};

const productId = async (req, res, next) => {
  const data = req.body;
  const result = await Promise.all(
    data.map((sale) => productService.check(sale.productId)),
  );
  if (result.some((check) => check === false)) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = { salesMiddleware, productId };