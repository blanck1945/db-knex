require("dotenv").config()
const express = require("express")

const server = express()
const PORT = process.env.PORT || 7901

//Importing Routes
const lessonsRoutes = require("./routes/lessonsRoutes")
const messageRoutes = require("./routes/messagesRoute")

server.use(express.json())

//using routes
server.use("/api/lessons", lessonsRoutes)
server.use("/api/lessons/message", messageRoutes)


server.get("/", async (req, res) => {
    res.send("Server is working")
})

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

