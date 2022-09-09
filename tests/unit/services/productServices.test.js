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
  afterEach(sinon.restore);

  describe("testando função getAll", () => {
    it("retorna todos os produtos", async () => {
      sinon.stub(productModel, "getAll").resolves(mockProducts);
      const response = await productService.getAll();
      expect(response).to.be.deep.equal(mockProducts);
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
        sinon.stub(productModel, "getById").resolves(mockProducts[0]);
        const product = await productService.getById(1);
        expect(result).to.be.deep.equal({
          type: null,
          message: mockProducts[0],
        });
      });
      
      it("Testa se ao digitar um id que não existe é retornado um objeto com erro", async function () {
      sinon.stub(productModel, "getById").resolves(undefined);

      const result = await productService.getById(99);

      expect(result).to.be.deep.equal({
      type: "PRODUCT_NOT_FOUND",
      message: "Product not found",
      });
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

  describe('testando a função create', () => {
    describe('produto criado com sucesso', () => {
      it('retorna o id do novo produto', async () => {
        const execute = [{ insertId: 4 }];
        sinon.stub(productModel, "create").resolves(execute);
        const product = await productService.create("ProdutoX");
        expect(product).to.be.an('object');
        expect(product).to.be.all.keys('id', 'name');
      })
    })
  })
});