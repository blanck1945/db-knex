const express = require("express")
const router = express.Router()
const db = require("../models/dbFunc")
const tables = require("./tables")

router.get("/all", (req, res) => {
    db.find(tables.messages)
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ message: "Something went wrong" }))
})

router.get("/single/:id", (req, res) => {
    const { id } = req.params
    db.findById(tables.messages, id)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "Record not found" })
            }
            else {
                res.status(200).json(data)
            }
        })
        .catch(err => res.status(500).json(err))
})

router.get("/single/:field/:value", (req, res) => {
    const { field } = req.params
    const { value } = req.params
    db.findByString(tables.messages, field, value)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "Record not found" })
            } else {
                res.status(200).json(data)
            }
        })
        .catch(err => res.status(500).json({
            message: "Something went wrong"
        }))
})

router.post("/add/:id", (req, res) => {
    const { id } = req.params
    const msg = req.body

    if (!msg.lesson_id) {
        msg["lesson_id"] = parseInt(id, 10)
    }

    db.findById(tables.lessons, id)
        .then(lesson => {
            if (!lesson) {
                res.status(404).json({ message: "Record not found" })
            }
            if (!msg.sender || !msg.message) {
                res.status(400).json({ message: "Both fields must be provided" })
            }
            db.addWithKey(tables.messages, "lesson_id", id, msg)
                .then(msg => res.status(200).json(msg))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.send(err))
})

router.delete("/delete/:id", (req, res) => {
    const { id } = req.params
    db.remove(tables.messages, id)
        .then(data => res.status(200).json({ message: "Message deleted" }))
        .catch(err => res.status(500).json({ message: "Something went wrong" }))
})

module.exports = router