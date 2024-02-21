const express = require('express');
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers")
const { json } = require("express");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials")

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partial_path);

app.get("", (req, res) => {
    res.render("index")
});

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/home", (req, res) => {
    res.render("home");
})

app.get("/tracker", (req, res) => {
    res.render("tracker");
})

app.get("/details", (req, res) => {
    res.render("details");
})

app.get("/report", (req, res) => {
    res.render("report");
})

app.get("/donations", (req, res) => {
    res.render("donations");
})

app.get("/about_us", (req, res) => {
    res.render("about_us");
})

app.get("/prev_health_report", (req, res) => {
    res.render("prev_health_report");
})

app.get("/awareness", (req, res) => {
    res.render("awareness");
})

app.post("/register", async (req, res) => {
    // res.render("register");
    try{

        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password===cpassword){
            const registerUser = new Register({
                name:req.body.name,
                username:req.body.username,
                email:req.body.email,
                phoneno:req.body.phoneno,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            })

            const registered=await registerUser.save();
            res.status(201).render("home");

        }else{
            res.send("passwords are not matching")
        }
       
    }catch(error){
        res.status(400).send(error)
    }
})

app.get("/login", (req, res) => {
    res.render("login");
})


app.post("/login", async(req, res) => {
    try{
        const email=req.body.email;
        const password=req.body.password;

//         const userEmail=await Register.findOne({email:email})

//         if(userEmail.password===password){
//             res.status(201).render("index");
//         }else{
//             res.send("invalid login");
//         }

//     }catch(error){
//         res.status(400).send("invalid email");
//     }
    
// })
        const userEmail = await Register.findOne({ email: email });

        if (userEmail) {
            if (userEmail.password === password) {
                res.status(201).render("home");
            } else {
                res.render("login", { error: "Invalid password" });
            }
        } else {
            res.render("login", { error: "Invalid email" });
        }

        } catch (error) {
        res.status(400).send("Invalid email");
        }
        });


app.listen(port, () => {
    console.log(`server is running at port no ${port}`)
})