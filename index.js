require("dotenv").config()
const express = require("express")
const cors = require("cors")
const session = require("express-session")
const morgan = require("morgan")
const helmet = require("helmet")

const server = express()
server.use(express.urlencoded({ extended: true }))
server.use(morgan('dev'))
server.use(helmet())
server.use(cors())

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const PORT = process.env.PORT || 7901

const sessionConfig = {
    name: 'Shirobako',
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false, //In production set this flag to true
        httpOnly: true, //true para no dar acceso con js
    },
    resave: false,
    saveUninitialized: true //In production set this flag to false
}

//Importing Routes
const lessonsRoutes = require("./routes/lessonsRoutes")
const messageRoutes = require("./routes/messagesRoute")
const userRoutes = require("./routes/userRoutes")
const bookRoutes = require("./routes/bookRoutes")
const authRoutes = require("./auth/authRoutes")
const cartRoutes = require("./routes/cartRoutes")
const restricted = require("./auth/restricted_middleware")
const { urlencoded } = require("express")


server.use(express.json())
server.use(session(sessionConfig))

//using routes
server.use("/api/auth", authRoutes)
server.use("/api/lessons", lessonsRoutes)
server.use("/api/messages", messageRoutes)
server.use("/api/users", /*restricted*/userRoutes)
server.use("/api/books", bookRoutes)
server.use("/api/carts", cartRoutes)

server.get("/", async (req, res) => {
    res.send("Server is working")
})

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

