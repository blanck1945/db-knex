const Axios = require("axios")
const book = require("./data")

const url = {
    auth: "http://localhost:7900/api/auth",
    msg: "http://localhost:7900/api/messages",
    user: "http://localhost:7900/api/users",
    book: "http://localhost:7900/api/books",
    lessons: "http://localhost:7900/api/lessons",
    addUrl: "http://localhost:7900/api/lessons/add",
    deleteUrl: "http://localhost:7900/api/lessons/delete"
}
/*
const herokuUrl = "https://node-db-tutorial1945.herokuapp.com/api/lessons"
const herokuPostMsg = "https://node-db-tutorial1945.herokuapp.com/api/lessons/message/",
const herokuRegister = "https://node-db-tutorial1945.herokuapp.com/api/auth"*/

const axiosPost = async (url, data) => {
    const axiosUrl = url + "/add"
    Axios({
        method: "post",
        data: data,
        url: axiosUrl
    }).then(res => console.log(res.data))
        .catch(err => console.log(err.response))

}

const registerData = {
    username: "blanck990",
    email: "blanck0@gmail.com",
    password: "roger990"
}

//axiosPost(url.book, book)
//axiosPost(registerData)


const loginUser = (url, user) => {
    const axiosUrl = url + "/login"
    Axios({
        method: "post",
        data: user,
        url: axiosUrl
    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
}

const userData = {
    username: "kubo990",
    password: "bianchi1933"
}
//loginUser("https://node-db-tutorial1945.herokuapp.com/api/auth/", userData)

/*
const userData = {
    username: "kubo990",
    email: "kubo990@gmail.com",
    password: "1234567"
}*/

//axiosPost(url.book, book)

const lesson = {
    name: "Biologia"
}
const user = {
    username: "blanck1945",
    email: "blanck1945@gmail.com",
    password: "bianchi1933"
}

//axiosPost(herokuUrl, lesson)
//axiosPost(url.urlGetAll, lesson)
//axiosPost(url.user, user)

const axiosGet = (url) => {
    const axiosUrl = url + "/all"

    Axios({
        method: "get",
        url: axiosUrl
    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data.message))
}

const herokuUser = "https://node-db-tutorial1945.herokuapp.com/api/users"
const herokuLessons = "https://node-db-tutorial1945.herokuapp.com/api/lessons"

//axiosGet(herokuUser)
//axiosGet(url.msg)
axiosGet(herokuLessons)
//axiosGet(url.book)

const axiosGetById = (url, id, query) => {
    const axiosUrl = url + "/" + query + "/" + id
    Axios({
        method: "get",
        url: axiosUrl
    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data))
}

const axiosGetByString = (url, field, value) => {
    const axiosUrl = url + "/single/" + field + "/" + value
    Axios({
        method: "get",
        url: axiosUrl
    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response))
}

const axiosContain = (url, field, value) => {
    const axiosUrl = url + "/single/contain/" + field + "/" + value
    Axios({
        method: "get",
        url: axiosUrl
    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response))
}

//axiosGetByString(url.msg, "sender", "Freya")
//axiosContain(url.lessons, "name", "Mate")

const axiosUpdate = (url, id, changes) => {
    Axios({
        method: "patch",
        url: url + "/" + id,
        data: changes
    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data.message))
}

const axiosJoin = (url, id) => {
    const axiosUrl = url + "/" + id + "/messages"
    Axios({
        method: "get",
        url: axiosUrl
    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data))
}


//loginUser(url.auth, userData)

const msg = {
    sender: "Ramon",
    message: "Las matematicas me abrieron el pensamiento a un mundo nuevo"
}

const updateLesson = {
    name: "Matematica"
}

const deleteFromDB = (url, id) => {
    Axios({
        method: "delete",
        url: url + "/delete/" + id
    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response))
}

//deleteFromDB(url.user, 1)

//axiosGet(url.msg, "all")

//axiosFunc(updateLesson)
//axiosGet(url.urlGetAll, "all")
//axiosGetById(url.urlGetAll, 2, "single")
//axiosGetById(url.msg, 2, "single")
//deleteFromDB(url.deleteUrl, 2)
//axiosUpdate(url.urlGetAll, 6, updateLesson)
//axiosJoin(url.urlGetAll, 1)
//axiosJoin(url.msg, 1)
//postMsg(msgUrl.get, 2, msg)
//deleteFromDB(url.msg, 12)
//getOneMsg(url.msg, 3)

const postMsg = (url, id, msg) => {
    const addUrl = url + "/add/" + id
    Axios({
        method: "post",
        data: msg,
        url: addUrl
    }).then(res => console.log(res.data))
        .catch(err => console.log(err.response))
}

//postMsg(msgUrl.get, 2, msg)




