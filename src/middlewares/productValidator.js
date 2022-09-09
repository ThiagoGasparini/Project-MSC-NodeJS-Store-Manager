const productSchema = require('./productSchema');

const productValidator = (req, res, next) => {
  const product = { ...req.body };
  const { error } = productSchema.validate(product);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }
  next();
};

module.exports = productValidator;
