import knex from "knex";
const db = knex({ client: "sqlite3",
  connection: {
    filename: "./sales.sqlite3"
  },
  useNullAsDefault: true
});

async function create_food(name){
    await db("food").insert({food_name: name});
    return "success";
}

async function read_food(){
    let food = await db("food");
    return food;
}

async function update_food(old, new_food){
    await db("food").where("food_name", old).update({food_name: new_food});
    return "updated";
}

async function delete_food(food){
    await db("food").where("food_name", food).del();
    return "deleted";
}

// subfood
async function create_subfood(group, name, desc, img, p){
    await db("subfood").insert({ id: group, food_name: name, description: desc, image: img, price: p});
    return "success";
}

async function read_subfood(){
    let subfood = await db("subfood");
    return subfood;
}

async function update_subfood(old, new_subfood){
    await db("subfood").where("subfood_name", old).update({subfood_name: new_subfood});
    return "updated";
}

async function delete_subfood(subfood){
    await db("subfood").where("subfood_name", subfood).del();
    return "deleted";
}

export { create_food, read_food, update_food, delete_food, 
        create_subfood, read_subfood, update_subfood, delete_subfood
};