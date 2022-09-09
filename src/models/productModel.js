const conn = require('./connection');

const productModel = {
  getAll: async () => {
    const [products] = await conn.execute(
      'SELECT * FROM StoreManager.products ORDER BY id',
    );
    return products;
  },

  getById: async (id) => {
    const [[product]] = await conn.execute(
      'SELECT * FROM StoreManager.products WHERE id = ?',
      [id],
    );
    if (!product) return null;
    return product;
  },

  create: async (name) => {
    const [{ insertId }] = await conn.query(
      `INSERT INTO StoreManager.products (name) 
    VALUES (?)`,
      [name],
    );
    return insertId;
  },

  update: async (id, name) => {
    await conn.execute(`UPDATE StoreManager.products SET name = ? 
    WHERE id = ?`,
    [name, id]);
    return { id, name };
  },

  delete: async (id) => {
    await conn.execute('DELETE FROM StoreManager.products WHERE id  = ?', [id]);
    return { id };
  },
};

module.exports = productModel;
