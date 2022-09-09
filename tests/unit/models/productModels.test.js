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

  describe("testando a função getById", () => {
    describe("produto com id informado", () => {
      it("retorna um objeto com chave id e name", async () => {
        sinon.stub(connection, "execute").resolves([[mockProducts[0]]]);

        const result = await productsModel.getById(1);

        expect(result).to.be.deep.equal(mockProducts[0]);
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

  describe("testando a função create", () => {
    describe("produto criado com sucesso", () => {
      it("retorna o id do novo produto", async () => {
        const execute = [{ insertId: 4 }];
        sinon.stub(connection, "query").resolves(execute);
        const product = await productModel.create("ProdutoX");
        expect(product).to.be.an("number");
        expect(product).to.be.equal(4);
      });
    });
    
    describe("se nao passar um nome", () => {
      it("retorna undefined", async () => {
        const execute = [[]];
        sinon.stub(connection, "execute").resolves(execute);
        const product = await productModel.create();
        expect(product).to.equal(undefined);
      });
    });
  });
});
