
exports.up = function (knex) {
    return knex.schema.createTable("lessons", (table) => {
        table.increments() //id field
        table.text("name", 128).notNullable()
        table.timestamps(true, true)
    })
        .createTable("messages", (table) => {
            table.increments()
            table.string("sender").notNullable().index()
            table.text("message").notNullable()
            table.timestamps(true, true)
            table.integer("lesson_id")
                .notNullable()
                .unsigned()
                .references('id')
                .inTable("lessons")
                .onDelete("CASCADE")
                .onUpdate("CASCADE")
        })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('messages').dropTableIfExists('lessons')
};
