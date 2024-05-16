import { describe, test, it, expect, beforeAll, beforeEach } from "vitest";
import request from "supertest";
import { items } from './fakeDb.js';
import app from "./app.js";

let testItem;


beforeEach(function () {
  items.length = 0;
  items.push(
    { name: 'milk', price: 5 },
    { name: 'hotdogs', price: 3 },
    { name: 'eggs', price: 3 }
  );
  testItem = "milk";
});

describe('GET /items', function () {
  test("valid", async function () {
    const resp = await request(app).get("/items");
    const itemsAnswer = {
      items: [
        { name: 'milk', price: 5 },
        { name: 'hotdogs', price: 3 },
        { name: 'eggs', price: 3 },
      ]
    };
    expect(resp.body).toEqual(itemsAnswer);
  });
  test('invalid', async function () {
    //TODO:fill out
  });
});

describe('GET /items/:name', function () {
  test("valid", async function () {
    const resp = await request(app).get(`/items/${testItem}`);
    expect(resp.body).toEqual({ name: "milk", price: 5 });
  });
  test('invalid', async function () {
    //TODO:fill out
  });
});

describe('PATCH /items/:name', function () {
  test("valid", async function () {

    const resp = await request(app)
      .patch(`/items/${testItem}`)
      .send({ name: "cheese", price: 10 });

    expect(resp.body).toEqual({ updated: { name: "cheese", price: 10 } });

    const updatedItemIdx = items.find(item => item.name === "cheese");
    expect(updatedItemIdx).not.toEqual(-1);

  });
  test('invalid', async function () {
    //TODO:fill out
  });
});


describe('DELETE /items/:name', function () {
  test("valid", async function () {

    const resp = await request(app).delete(`/items/${testItem}`);

    expect(resp.body).toEqual({ message: "Deleted" });

    const updatedItemIdx = items.findIndex(item => item.name === "milk");
    expect(updatedItemIdx).toEqual(-1);

  });
  test('invalid', async function () {
    //TODO:fill out
  });
});