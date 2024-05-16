import express from "express";
import { items } from "../fakeDb.js";
import { NotFoundError, BadRequestError } from "../expressError.js";
import { checkForBody } from "../validation";

const router = new express.Router();


/** Take variable and return a single item from shopping list if it exists
 * Input:
 *  /:name
 * Output:
 *  {added: {name: "popsicle", price: 1.45}}
*/
router.get("/:name", function (req, res) {
  const itemName = req.params.name;
  console.log(itemName);
  console.log(items);
  const item = items.filter(item => item.name === itemName)[0];

  console.log(item);

  if (item !== undefined) {
    return res.json({ item });
  } else {
    throw new NotFoundError();
  }
});


/** Returns list of shopping items
 * Eg. {
 *          items: [
                { name: "popsicle", price: 1.45 },
                { name: "cheerios", price: 3.40 }
            ]
        }
*/
router.get("", function (req, res) {
  return res.json({ items });
});


/** Adds shopping item to list. Returns JSON of shopping list item added
 * Input:
 *  {name: "popsicle", price: 1.45}
 * Output:
 *  {added: {name: "popsicle", price: 1.45}}
*/
router.post("", checkForBody, function (req, res) {
  const newItem = req.body;
  items.push(newItem);
  return res.json({ added: newItem });
});



/** Take name of item and JSON and update existing item
 * Input:
 *  /:name
 *  body: {name: "new popsicle", price: 2.45}
 * Output:
 *  {updated: {name: "new popsicle", price: 2.45}}
*/
router.patch("/:name", checkForBody, function (req, res) {
  const itemEdits = req.body;
  const itemName = req.params.name;
  const item = items.filter(item => item.name === itemName)[0];

  if (item !== undefined) {
    item['name'] = itemEdits['name'] || item['name'];
    item['price'] = itemEdits['price'] || item['price'];

    return res.json({ updated: item });
  } else {
    throw new NotFoundError();
  }
});

/** Delete item from shopping list
 * Input:
 *  /:name
 * Output:
 *  {message: "Deleted"}
*/
router.delete("/:name", function (req, res) {
  const itemName = req.params.name;
  const itemIdx = items.findIndex(item => item.name === itemName);

  if (itemIdx === - 1) {
    throw new NotFoundError();
  }

  items.splice(itemIdx, 1);

  return res.json({ message: "Deleted" });
});

export default router;