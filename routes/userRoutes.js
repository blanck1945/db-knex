const express = require("express")
const router = express.Router()
const db = require("../models/dbFunc")
const bcrypt = require("bcryptjs")
const tables = require("./tables")

router.get("/all", async (req, res) => {
    try {
        const users = await db.find(tables.users)
        res.status(200).json(users)
    }
    catch (err) {
        res.status(500).json({
            message: "Unable to perform the operation", db: "Check table value is pass to functions"
        })
    }
})

router.get("/single/:id", (req, res) => {
    try {
        const user = db.findById(tables.user, req.params.id)
        res.status(200).json(user)
    }
    catch (err) {
        res.status(500).json({
            message: "Unable to perform the operation", db: "Check table value is pass to functions"
        })
    }
})

router.get("/single/:field/:value", (req, res) => {
    const { field } = req.params
    const { value } = req.params
    db.findByString(tables.users, field, value)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "No User found" })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => res.status(500).json({
            message: "Unable to perform the operation", db: "Check table value is pass to functions"
        }))
})

router.delete("/delete/:id", (req, res) => {
    const { id } = req.params
    db.remove(tables.users, id)
        .then(user => res.status(200).json({ message: "Record deleted", query: id }))
        .catch(err => res.status(500).json({
            message: "Unable to perform the operation", db: "Check table value is pass to functions"
        }))
})

module.exports = router;