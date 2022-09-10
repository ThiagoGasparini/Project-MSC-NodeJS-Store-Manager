# Boas-vindas ao repositório do Projeto Store Manager

<details>
  <summary><strong>👨‍💻 O que foi desenvolvido:</strong></summary>

Desenvolvi minha primeira API utilizando a arquitetura MSC (model-service-controller)!

Esse projeto é uma API RESTfull a qual gerência um sistema de vendas no formato dropshipping no qual é possivel criar, visualizar, deletar e atualizar produtos e vendas da loja. Desenvolvido na Trybe com uso de JavaScript, Node Js e Express.

  <br />
</details>

# Contexto

Esse projeto é um CRUD (create,read,update,delete) Store API que se conecta a um banco de dados MySQL para gerenciar produtos e vendas de uma loja. Para isso é utilizado de diversas ferramentas e implementado a arquitetura MSC (model-service-controller).

# Tecnologias, bibliotecas e arquiteturas usadas:

Node.js, Express, Nodemon, Joi | Criação de protocolo HTTP API, Roteador de API, improve API development, validação de data.
MySQL | Criação e gerenciamento de dados.
MSC | Arquiterura model, service, controller.
REST | Arquitetura Rest.

#### Tabelas

O banco terá três tabelas:

- A tabela `products`, com os atributos `id` e `name`;
- A tabela `sales`, com os atributos `id` e `date`;
- A tabela `sales_products`, com os atributos `sale_id`, `product_id` e `quantity`;
- O script de criação do banco de dados pode ser visto [aqui](migration.sql);
- O script que popula o banco de dados pode ser visto [aqui](seed.sql);

