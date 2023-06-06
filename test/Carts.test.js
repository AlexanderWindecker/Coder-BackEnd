import "./db.js";
import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080");

const productCartMock_1 = {
  title: "Mock1",
  description: "MockingTest1",
  code: "test1",
  price: 123,
  status: true,
  stock: 123,
  category: "Mocking1",
  thumbnail: "MockTest1",
};

const productCartMock_2 = {
  title: "Mock2",
  description: "MockingTest2",
  code: "test2",
  price: 234,
  status: true,
  stock: 234,
  category: "Mocking2",
  thumbnail: "MockTest2",
};

const productCartMock_3 = {
  quantity: 7,
};

describe("Testing de CartsDAO para MongoDB", function () {
  beforeEach(function () {
    this.timeout(10000);
  });

  it("Endpoint GET ALL /api/carts", async function () {
    const response = await request.get("/api/carts");
    expect(response._body).to.not.have.lengthOf(0);
  });
  it("Endpoint GET ID /api/carts/:pid", async function () {
    const id = "6421d4c04ebffc2e2504341d";
    const response = await request.get(`/api/carts/${id}`);
    expect(response._body).to.have.lengthOf(1);
    expect(response._body[0]._id).to.be.equal(id);
  });
});
