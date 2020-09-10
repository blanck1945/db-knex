const Axios = require("axios")

const url = {
    msg: "http://localhost:7900/api/lessons/message",
    urlGetAll: "http://localhost:7900/api/lessons",
    addUrl: "http://localhost:7900/api/lessons/add",
    deleteUrl: "http://localhost:7900/api/lessons/delete"
}

const herokuUrl = "https://node-db-tutorial1945.herokuapp.com/api/lessons"
const herokuPostMsg = "https://node-db-tutorial1945.herokuapp.com/api/lessons/message/"

const axiosPost = async (url, lesson) => {
    const axiosUrl = url + "/add"
    Axios({
        method: "post",
        data: lesson,
        url: axiosUrl
    }).then(res => console.log(res.data))
        .catch(err => console.log(err.response))

}

const lesson = {
    name: "Sociologia"
}


axiosPost(herokuUrl, lesson)
//axiosPost(url.urlGetAll, lesson)

const axiosGet = (url, query) => {
    const axiosUrl = url + "/" + query
    Axios({
        method: "get",
        url: axiosUrl
    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data))
}

const axiosGetById = (url, id, query) => {
    const axiosUrl = url + "/" + query + "/" + id
    Axios({
        method: "get",
        url: axiosUrl
    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data))
}

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




