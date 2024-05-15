import express from "express";
import items from "fakeDb.js";

const router = new express.Router();

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


/** Returns list of shopping items
 * Eg. {
 *          added: {
                { name: "popsicle", price: 1.45 },
                { name: "cheerios", price: 3.40 }
            }
        }
*/
router.post("", function (req, res) {
    const newItem = req.body;
    items.push(newItem);
    return res.json({ added: newItem });
});