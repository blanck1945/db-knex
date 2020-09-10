const express = require("express")
const router = express.Router()
const Lessons = require("../models/dbFunc")
const tables = require("./tables")

router.get("/all", (req, res) => {
    Lessons.find(tables.lessons)
        .then(data => res.json(data))
        .catch(err => res.send(err))
})

router.get("/single/:id", (req, res) => {
    const { id } = req.params
    Lessons.findById(tables.lessons, id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: "Record not found" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Unable to perform opration" })
        })
})

router.get("/:id/messages", (req, res) => {
    const { id } = req.params

    Lessons.findAndJoin(tables.lessons, tables.messages, id)
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ message: "Something went wrong" }))
})

router.patch("/:id", (req, res) => {
    const { id } = req.params
    const changes = req.body
    Lessons.update(id, changes)
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
    Lessons.add(tables.lessons, req.body)
        .then(lesson => {
            res.status(200).json(lesson)
        })
        .catch(err => res.json({ message: "Unable to perform operation", reminder: "Check table is pass to DBfunc" }))
})


router.delete("/delete/:id", (req, res) => {
    const { id } = req.params
    Lessons.remove(tables.lessons, id)
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