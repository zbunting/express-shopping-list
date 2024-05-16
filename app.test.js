import { describe, test, it, expect, beforeAll, beforeEach } from "vitest";
import request from "supertest";
import { items } from './fakeDb.js';
import app from "./app.js";


beforeEach(function () {
  items.push(
    { name: 'milk', price: 5 },
    { name: 'hotdogs', price: 3 },
    { name: 'eggs', price: 3 }
  );
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
