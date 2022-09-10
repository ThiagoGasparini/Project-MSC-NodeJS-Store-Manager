const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../../src/models/connection");
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

  describe('testando função getAll', () => {
    it('retorna todos os produtos em um array', async () => {
      sinon.stub(connection, 'execute').resolves([mockProducts]);
      const result = await productModel.getAll();
      expect(result).to.be.deep.equal(mockProducts);
    })

    it('testando se retorna null', async () => {
      sinon.stub(connection, 'execute').resolves([]);
      const product = await productModel.getAll(99);
      expect(product).to.be.equal(undefined); 
    })
  });

  describe("testando a função getByID", () => {
     
      it("ao não achar produto com id informado retorna null ", async () => {
        const execute = [[]];
        sinon.stub(connection, "execute").resolves(execute);
        const product = await productModel.getById(999);
        expect(product).to.equal(null);
      });
  });

  describe("testando a função create", () => {

     
      it("retorna undefined", async () => {
        const execute = [[]];
        sinon.stub(connection, "execute").resolves(execute);
        const product = await productModel.create();
        expect(product).to.equal(undefined);
      });
  });
});
