const sinon = require("sinon");
const { expect } = require("chai");

const productController = require('../../../src/controllers/productController');
const productService = require("../../../src/services/productService");

const mockProducts = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

describe('testando camada Controller', () => {
  beforeEach(sinon.restore);
  describe('testando função getAll', () => {
    it('case OK', async () => {
      sinon.stub(productService, "getAll").resolves(mockProducts);
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await productController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockProducts)).to.be.true;
    })
  })
  describe('testa getById', () => {
    it("case OK", async () => {
      const productObj = {
        id: mockProducts[0].id,
        name: mockProducts[0].name,
      };
      sinon.stub(productService, "getById").resolves(productObj);
      const req = {};
      const res = {};
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await productController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(productObj)).to.be.true;
    });

    it('case N OK', async () => {
      sinon.stub(productService, 'getById').resolves(null);
      const req = {};
      const res = {};
      req.params = { id: 999 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await productController.getById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Product not found'})).to.be.true;
    })
  })

  describe("testando função create", () => {
    it("criando o produto", async () => {
      const productObj = { name: "ProdutoX" };
      sinon.stub(productService, "create").resolves(productObj);
      const req = {};
      const res = {};
      req.body = { name: "ProdutoX" };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await productController.create(req, res);
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(productObj)).to.be.true;
    });
  });
});