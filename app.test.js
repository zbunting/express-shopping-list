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
  test('reponds with 200', async function () {
    const resp = await request(app).get("/items");

    expect(resp.statusCode).toEqual(200);
  });
});

describe('GET /items/:name', function () {
  test("valid", async function () {
    const resp = await request(app).get(`/items/${testItem}`);
    expect(resp.body).toEqual({ name: "milk", price: 5 });
  });

  test('GET invalid item', async function () {
    const resp = await request(app).get(`/items/lollypops`);

    expect(resp.statusCode).toEqual(404);
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
  test('PATCH item that does not exist', async function () {
    const resp = await request(app)
      .patch(`/items/lollypops`)
      .send({
        name: 'popsicle'
      });
    expect(resp.statusCode).toEqual(404);

  });

  test('PATCH existing item with bad value does not change item', async function () {
    const resp = await request(app)
      .patch(`/items/eggs`)
      .send({
        color: 'orange'
      });

    expect(resp.body).toEqual({ updated: { name: 'eggs', price: 3 } });
  });

  test('PATCH item without body', async function () {
    const resp = await request(app)
      .patch(`/items/eggs`);

    expect(resp.statusCode).toEqual(400);
  });
});


describe('DELETE /items/:name', function () {
  test("valid", async function () {

    const resp = await request(app).delete(`/items/${testItem}`);

    expect(resp.body).toEqual({ message: "Deleted" });

    const updatedItemIdx = items.findIndex(item => item.name === "milk");
    expect(updatedItemIdx).toEqual(-1);

  });
  test('DELETE item that does not exist', async function () {
    const resp = await request(app).delete(`/items/apples`);

    expect(resp.statusCode).toEqual(404);
  });
});