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
  beforeEach(sinon.restore);

  describe('testando função getAll', () => {
    it('retorna todos os produtos em um array', async () => {
      sinon.stub(connection, 'execute').resolves([mockProducts]);
      const product = await productModel.getAll();
      expect(product).to.be.an('array');
      expect(product).to.have.length(3);
      expect(product).to.be.equal(mockProducts);
    })

    it('testando se retorna null', async () => {
      sinon.stub(connection, 'execute').resolves([]);
      const product = await productModel.getAll();
      expect(product).to.equal(undefined);  
    })
  });

  describe("testando a função getById", () => {
    describe("produto com id informado", () => {
      it("retorna um objeto com chave id e name", async () => {
        const execute = { id: 1, name: "Machado do Thor Stormbreaker" };
        sinon.stub(connection, "execute").resolves([[execute]]);
        const product = await productModel.getById(1);
        expect(product).to.be.an("object");
        expect(product).to.be.all.keys("id", "name");
      });
    });

    describe("ao não achar produto com id informado", () => {
      it("retorna null ", async () => {
        const execute = [[]];
        sinon.stub(connection, "execute").resolves(execute);
        const product = await productModel.getById(999);
        expect(product).to.equal(null);
      });
    });
  });
});
