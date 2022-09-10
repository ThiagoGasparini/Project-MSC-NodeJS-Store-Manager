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
  
    it("buscando pelo id", async () => {
      const productObj = { id: mockProducts[0].id, name: mockProducts[0].name}
      sinon.stub(productService, 'getById').resolves(productObj);

      const req = {};
      const res = {};

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await productController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(productObj)).to.be.true;
    });

    it('id inexistente', async () => {
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