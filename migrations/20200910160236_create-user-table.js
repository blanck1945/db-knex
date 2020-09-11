
exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments()
        table.string("username", 55).notNullable().unique().index()
        table.string("email", 128).notNullable().unique()
        table.string("password", 55).notNullable()
    })
        .createTable("books", (table) => {
            table.increments()
            table.string("product_name").notNullable().index()
            table.integer("product_volume").notNullable().unique()
            table.float("product_price").notNullable()
            table.string("product_author").notNullable()
            table.string("product_category").notNullable()
            table.boolean("product_add").notNullable().defaultTo(false)
            table.integer("product_rank").notNullable().defaultTo(0)
            table.string("product_img").nullable()
            table.text("product_desc").notNullable()
            table.string("product_format").notNullable()
            table.integer("product_pages").notNullable()
            table.string("product_dimention").nullable()
            table.string("product_publish_day").notNullable()
            table.string("product_editor").notNullable()
            table.string("product_publish_location").notNullable()
            table.string("product_languaje").notNullable()
            table.integer("product_ISBN10").notNullable()
            table.integer("product_ISBN13").notNullable()
            table.integer("product_selling_rank").notNullable().defaultTo(0)
            table.json("product_similar").nullable()
            table.integer("product_percentage").notNullable()
            table.integer("product_total_sell").notNullable().defaultTo(0)
        })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users").dropTableIfExists("books")
};
