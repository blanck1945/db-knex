const express = require("express")
const router = express.Router()
const db = require("../models/dbFunc")
const tables = require("./tables")

router.get("/all", (req, res) => {
    db.find(tables.lessons)
        .then(data => res.json(data))
        .catch(err => res.send(err))
})

router.get("/single/:id", (req, res) => {
    const { id } = req.params
    db.findById(tables.lessons, id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: "Record not found" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Unable to perform operation" })
        })
})

router.get("/single/contain/:field/:value", (req, res) => {
    const { field } = req.params
    const { value } = req.params
    db.findIfContain(tables.lessons, field, value)
        .then(data => res.json(data))
        .catch(err => res.status(500).json({
            message: "Unable to perform operation"
        }))
})

router.get("/:id/messages", (req, res) => {
    const { id } = req.params

    db.findAndJoin(tables.lessons, tables.messages, id)
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ message: "Something went wrong" }))
})


router.patch("/:id", (req, res) => {
    const { id } = req.params
    const changes = req.body
    db.update(tables.lessons, id, changes)
        .then(data => {
            if (data) {
                console.log("using this route")
                res.status(200).json({ data })
            }
            else {
                res.status(404).json({ message: "Record not found" })
            }
        })
        .catch(err => res.status(500).json({ message: "Unable to perform operation" }))
})

router.post("/add", (req, res) => {
    db.add(tables.lessons, req.body)
        .then(lesson => {
            res.status(200).json(lesson)
        })
        .catch(err => res.json({ message: "Unable to perform operation", reminder: "Check table is pass to DBfunc" }))
})


router.delete("/delete/:id", (req, res) => {
    const { id } = req.params
    db.remove(tables.lessons, id)
        .then(data => {
            if (data) {
                res.status(200).json({ message: "Record deleted" })
            } else {
                res.status(404).json({ message: "Record not found" })
            }
        })
        .catch(err => res.status(500).json({ message: "Unable to perform operation" }))
})

module.exports = router