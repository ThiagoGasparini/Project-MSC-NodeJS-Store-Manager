const conn = require('./connection');

const salesModel = {
  createSale: async () => {
    const execute = 'INSERT INTO StoreManager.sales (date) VALUES (now())';
    const [{ insertId }] = await conn.query(execute);
    return { id: insertId };
  },

  createSaleProduct: async (saleInfo) => {
    const execute = `INSERT INTO StoreManager.sales_products (sale_id,product_id,quantity)
    VALUES (?,?,?)`;
    const { saleId, productId, quantity } = saleInfo;
    await conn.query(execute, [saleId, productId, quantity]);

    return { productId, quantity };
  },

  getAll: async () => {
    const query = `SELECT sale_id as saleId, date, product_id as productId, quantity 
      FROM StoreManager.sales_products as sp
      JOIN StoreManager.sales as s
      ON sp.sale_id = s.id
      ORDER BY sale_id, product_id`;
    const [result] = await conn.execute(query);
    return result;
  },

  getById: async (id) => {
    const query = `SELECT date, product_id as productId, quantity 
      FROM StoreManager.sales_products as sp
      JOIN StoreManager.sales as s
      ON sp.sale_id = s.id
      WHERE sp.sale_id = ?
      ORDER BY sale_id, product_id`;
    const [result] = await conn.query(query,
       [id]);
    if (result.length === 0) return null;
    return result;
  },
};

module.exports = salesModel;