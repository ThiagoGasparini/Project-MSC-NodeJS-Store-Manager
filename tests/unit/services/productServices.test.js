const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../../src/models/connection");
const productService = require("../../../src/services/productService");
const productModel = require("../../../src/models/productModel");

const mockProducts = [
  {
    id: 1,
    name: "Machado do Thor Stormbreaker",
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

describe('Testando camada Model', () => { 
  beforeEach(sinon.restore);

  describe("testando função getAll", () => {
    it("retorna todos os produtos", async () => {
      sinon.stub(productModel, "getAll").resolves([mockProducts]);
      const response = await productService.getAll();
      expect(response).to.be.an("array");
    });
    it("retorna undefined", async () => {
      sinon.stub(productModel, "getAll").resolves();
      const response = await productService.getAll();
      expect(response).to.equal(undefined);
    });
  });

  describe("testando a função getById", () => {
    describe("ao achar produto com id informado", () => {
      it("retorna um objeto com chave id e name", async () => {
        const execute = { id: 1, name: "Machado do Thor Stormbreaker" };
        sinon.stub(productModel, "getById").resolves(execute);
        const product = await productService.getById(1);
        expect(product).to.be.a("object");
        expect(product).to.be.all.keys("id", "name");
      });
    });

    describe("ao não achar produto com id informado", () => {
      it("retorna null ", async () => {
        sinon.stub(productModel, "getById").resolves();
        const product = await productService.getById(999);
        expect(product).to.equal(null);
      });
    });
  });
});