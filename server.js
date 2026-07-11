import express, { urlencoded } from 'express';
import { engine } from 'express-handlebars';
import path from "path";
import multer from "multer";
import { create_food, read_food, update_food, delete_food, create_subfood, read_subfood } from './model/db.js';

const app = express();

app.use(express.json());
app.set("views", "./views");
app.use(express.static(path.resolve("public")));
app.use(express.urlencoded({ extended: true }));

app.engine(".hbs", engine({extname: "hbs", helpers: { }}));
app.set("view engine", ".hbs");

const upload = multer({dest: "uploads/"});
const date = new Date();

var titles = {
    "names": "Afang with perewinkles",
    "desc": "Buy Afang which is always ready anytime anywhere",
    "time": `${date.getFullYear()}`,
    "price": '16.00'
};

app.get("/", async (req, res)=>{
    let {food, subfood} = await read_food();
    res.render("payment", {aside: food, cards: subfood, total_food: 0, title:titles});
})

app.get("/admin", async (req, res)=>{
    var food = await read_food();
    res.render("admin", {group: food});
})

app.post("/insert_subfood", upload.single("photo"), (req, res)=>{
    let {group, foodtitle, fooddescription, price} = req.body;
    let filename = req.file.filename;

    create_subfood(group, foodtitle, fooddescription, filename, price);
    res.json({data: "success"});
})

app.post("/insert_food", (req, res)=>{
    let data = req.body.food;
    for(const f of data){
        create_food(f);
    }
    res.json({success: true})
})

app.listen(3000, ()=>{
    console.log("server running on port, 3000");
})