import express, { urlencoded } from 'express';
import { engine } from 'express-handlebars';
import path from "path";
import multer from "multer";
import session from "express-session";
import svgCaptcha from "svg-captcha";
import { create_food, read_food, update_food, delete_food, create_subfood, read_subfood } from './model/db.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({secret: "cybertheftisgoals", resave: false, saveUinitialized: true }));
app.set("views", "./views");
app.use(express.static(path.resolve("public")));

app.engine(".hbs", engine({extname: "hbs", helpers: { }}));
app.set("view engine", ".hbs");

const upload = multer({dest: "uploads/"});
const date = new Date();

app.get("/", (req, res)=>{
    res.render("index");
});

app.post("/api/login", (req, res)=>{
    let {username, password} = req.body;

    if(username.toLowerCase().trim() == "kala" && password.toLowerCase().trim() == "kala"){
        res.json({success: true, data: "/captcha"});

        // verify the captcha, to tell that user is not a robot.
        // if(req.body.captcha === req.session.captcha.toLowerCase()){
        //     res.redirect("/payment");
        // }else{
        //     res.Json({login: false});
        // }
    }else{
        res.json({login: false});
    };
});

app.get("/admin", async (req, res)=>{
    var food = await read_food();
    res.render("admin", {group: food});
});

app.get("/payment", async (req, res)=>{
    let {food, subfood} = await read_food();
    res.render("payment", {aside: food, cards: subfood, total_food: 0, title:9});
})

app.get("/captcha", (req, res)=>{
    const captcha = svgCaptcha.create({size:6, noise:2, color: true, background:"#f4f4f4"});
    req.session.captcha = captcha.text; // save the answer 
    res.type("svg");
    res.send(captcha.data);
});

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
    console.log("server running on port, http://127.0.0.1:3000");
})