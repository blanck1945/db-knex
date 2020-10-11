const express = require("express")
const router = express.Router()
const db = require("../models/dbFunc")
const tables = require("./tables")
const { findById } = require("../models/dbFunc")

router.get("/single/:id", async (req, res) => {
    const { id } = req.params
    try {
        const cart = await db.findById(tables.carts, id)
        console.log(cart.cart_products)
        res.status(200).json(cart)
    }
    catch (err) {
        res.status(500).json({ message: "Enable to perform operation" })
    }
})

router.post("/create/:id", async (req, res) => {
    const { id } = req.params
    try {
        const cart = {
            cart_products: JSON.stringify([""]),
            user_id: id
        }
        await db.add(tables.carts, cart)
        res.status(200).json({ message: "Cart created and link" })
    }
    catch (err) {
        res.status(500).json(err)
    }
})

router.patch("/update/:id", async (req, res) => {
    const { id } = req.params
    const cart = req.body
    try {
        db('table')
            .where('id', id)
            .update({
                cart_products: db.raw(`cart_products || ?::json`, JSON.stringify(cart.cart_products))
            })
        /*db("carts").where({ id: id }).update({
            cart_products: cart.cart_products
        })*/
        //await db.updateArr(tables.carts, id, cart.cart_products)
        //await db.update(tables.carts, id, JSON.stringify(cart.cart_products))
        res.status(200).json({ message: "articles added to the cart" })
    }
    catch (err) {
        res.status(500).json({ message: "Enable to perform operation" })
    }
})

module.exports = router;