const express = require("express")
const router = express.Router()
const db = require("../models/dbFunc")
const tables = require("./tables")

router.get("/all", (req, res) => {
    db.find(tables.books)
        .then(data => res.status(200).send(data))
        .catch(err => res.staus(500).json({
            message: "Unable to perform operation"
        }))
})

router.post("/add", async (req, res) => {
    const book = req.body
    try {
        const addedBook = await db.add(tables.books, book)
        res.status(200).json(addedBook)
    }
    catch (err) {
        console.log(err)
        res.json(err)
    }
})

module.exports = router;