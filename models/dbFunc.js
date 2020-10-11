/*const knex = require("knex")
const config = require("../knexfile")
const db = knex(config.development)*/
const db = require("../db/dbConfig")

const add = async (table, data) => {
    return db.insert(data).returning("*").into(table)
    /*const [id] = await db(table).returning('id').insert(data)
    const searchId = parseInt(id)
    //const [id] = await db(table).insert(data)
    return findById(table, searchId)*/
}

const addWithKey = async (table, table_field, foreing_id, msg) => {
    await db(table).where({ [table_field]: foreing_id }).insert(msg, ['id'])
    return findById(table, id)
    //const [id] = await db(table).where({ [table_field]: foreing_id }).insert(msg)
}

const addForeignKey = async (table, id, table_field, foreing_key) => {
    return await db(table).where({ id }).insert({ [table_field]: foreing_key })
}

const find = async (table) => {
    return await db(table)
}

const findAllByString = (table, field, value) => {
    return db(table).where({ [field]: value })
}

const findById = (table, id) => {
    return db(table).where({ id }).first()
}

const findByString = (table, field, value) => {
    return db(table).where({ [field]: value }).first()
}

const findIfContain = (table, field, value) => {
    return db(table).where(field, 'like', `%${value}%`)
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

const update = async (table, id, changes) => {
    return (
        await db(table)
            .where({ id: id })
            .update({ changes })
            .then(() => {
                return findById(id)
            })
    )
}

const updateArr = async (table, id, changes) => {
    return await db(table)
        .where('id', id)
        .update({
            cart_products: db.raw(`??, ??`, ['cart_products', JSON.stringify(changes)])
        })
}
/*
knex('table').update({
    jsonbColumn: knex.raw(`jsonb_set(??, '{lat}', ?)`, ['jsonbColumn', newLatValue])
})*/

module.exports = {
    add,
    addWithKey,
    addForeignKey,
    find,
    findAllByString,
    findById,
    findByString,
    findIfContain,
    findAndJoin,
    remove,
    update,
    updateArr
}