/*const knex = require("knex")
const config = require("../knexfile")
const db = knex(config.development)*/
const db = require("../db/dbConfig")

const add = async (table, lesson) => {
    const [id] = await db(table).insert(lesson)
    return findById(id)
}

const addWithKey = async (table, msg, table_field, foreing_id) => {
    const [id] = await db(table).where({ [table_field]: foreing_id }).insert(msg)
    return findById(table, id)
}

const find = (table) => {
    return db(table)
}

const findById = (table, id) => {
    return db(table).where({ id }).first()
}

const findAndJoin = (table1, table2, join_id) => {
    return db(table1)
        .join(table2, `${table1}.id`, `${table2}.lesson_id`)
        .select(
            "lessons.id as lessonId",
            "lessons.name as lessonName",
            "messages.id as msgId",
            "messages.sender",
            "messages.message"
        )
        .where({ lesson_id: join_id })
}

const remove = async (table, id) => {
    return await db(table).where({ id }).del()
}

const update = async (id, changes) => {
    return (
        await db("lessons")
            .where({ id })
            .update(changes)
            .then(() => {
                return findById(id)
            })
    )
}

module.exports = {
    add,
    addWithKey,
    find,
    findById,
    findAndJoin,
    remove,
    update,
}