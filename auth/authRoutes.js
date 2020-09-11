const express = require("express")
const router = express.Router()
const db = require("../models/dbFunc")
const bcrypt = require("bcryptjs")
const tables = require("../routes/tables")


router.post("/login", async (req, res) => {
    const { username, password } = req.body
    try {
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const userMatch = await db.findByString(tables.users, "username", username)
        if (!userMatch) {
            return res.status(404).json({ message: "User is not register" })
        }

        const comparaPass = await bcrypt.compareSync(password, userMatch.password)
        if (!comparaPass) {
            return res.status(404).json({ message: "Password dont match" })
        }
        console.log(req.session)

        req.session.user = {
            id: userMatch.id,
            username: userMatch.username
        }
        console.log(req.session)


        res.status(200).json({ message: `Welcome ${username}` })

    }
    catch (err) {
        res.status(500).json(err)
    }
})

router.post("/add", async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const userMatch = await db.findByString(tables.users, "username", username)
    if (userMatch) {
        return res.status(404).json({ message: "Username already exist" })
    }

    const emailMatch = await db.findByString(tables.users, "email", email)
    if (emailMatch) {
        return res.status(404).json({ message: "Email already exist" })
    }

    const hashPass = await bcrypt.hashSync(req.body.password, 12)
    req.body.password = hashPass

    db.add(tables.users, req.body)
        .then(user => res.status(200).json(user))
        .catch(err => err.status(500).json({ message: "Unable to perform the operation", db: "Check table value is pass to functions" }))
})

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            res.status(200).json({ message: "Hope to see you soon" })
        })
    }
})

module.exports = router;
