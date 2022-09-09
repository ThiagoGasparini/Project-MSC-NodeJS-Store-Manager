const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const { expect } = chai;

const productController = require('../../../src/controllers/productController');
const productService = require("../../../src/services/productService");

chai.use(sinonChai);

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
  afterEach(sinon.restore);

  describe('testando função getAll', () => {
    it('retorna a lista', async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, "getAll").resolves(mockProducts);

      await productController.getAll(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockProducts);
    })
  })
  describe('testa getById', () => {
    it("buscando pelo id", async () => {
      const res = {};
      const req = {
      params: {
        id: 1,
      },
    };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(productService, "getById")
      .resolves({ type: null, message: mockProducts[0] });

      await productController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockProducts[0]);
    });

    it('id inexistente', async () => {
      const res = {};
      const req = {
      params: {
        id: 99,
      },
    };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(productService, "getById")
      .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      await productController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Product not found" });
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