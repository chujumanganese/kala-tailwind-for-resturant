/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("subfood", table=>{
        table.string("id").references("food_name").inTable("food").onDelete("CASCADE");
        table.string("food_name", {length: 150});
        table.string("description", {length: 200});
        table.string("image", {length: 250});
        table.decimal("price", {precision: 4});
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
   return knex.schema.dropTableIfExists("subfood");
};
