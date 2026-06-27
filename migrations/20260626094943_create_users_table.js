/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("users", table=>{
        table.increments("id").primary();
        table.string("username", {length: 50});
        table.string("password", {length: 150});
        table.timestamp("dates", {useTz: true}); 
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("users");
};
