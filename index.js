const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");
const { faker } = require('@faker-js/faker');

//This methodOverride package allows us to send DELETE,PATCH,PUT send from HTML FORMS.(by default only GET and POST are only supported)
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//SQL DB Connection 
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "delta_app",
})
//Function by faker to generate fake data
let createRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),
    ];
}

app.listen(port, (req, res) => {
    console.log(`App is listning at port ${port}`);
})

//Home page
app.get("/", (req, res) => {

    let q = "SELECT COUNT(*)  AS userCount FROM user";
    connection.query(q, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        let count = result[0].userCount;
        res.render("home.ejs", { count });
    });
});

//Show user (to get user list)
app.get("/user", (req, res) => {
    let q = "SELECT id,username,email FROM user";
    connection.query(q, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        let userData = result;
        res.render("showusers.ejs", { userData });
    });
});
//To edit username (edit username form)
app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = "SELECT * FROM user WHERE id=?";
    connection.query(q, [id], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        let userData = result[0];
        res.render("edit.ejs", { userData });
    })

});
//TO update username in db
app.patch("/user/:id", (req, res) => {
    let { id } = req.params;
    let { password, username } = req.body;
    let q = "SELECT * FROM user WHERE id= ?";
    console.log(username);
    console.log(password);
    connection.query(q, [id], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (result.length == 0) {
            console.log("user not found");
            return res.send("User not found");
        }
        let userPassword = result[0].password;
        if (password === userPassword) {
            let q = "UPDATE user SET username=? Where id =?";
            connection.query(q, [username, id], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    res.redirect("/user");
                }
            })
        } else {
            console.log("wrong password");
            return res.send("Wrong password");
        }

    })
});
//Form to add user
app.get("/user/add", (req, res) => {
    res.render("add.ejs");
});
//TO add new user
app.post("/user", (req, res) => {
    let id = uuidv4();
    let { username, email, password } = req.body;
    let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
    connection.query(q, [id, username, email, password], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            res.redirect("/user");
        }
    })
})
//To get delete form
app.get("/user/:id/delete", (req, res) => {
    let { id } = req.params;
    let q = "SELECT * FROM user WHERE id=?";
    connection.query(q, [id], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        let userData = result[0];
        res.render("delete.ejs", { userData });
    })

})
//To Delete user from db
app.delete("/user/:id", (req, res) => {
    let { id } = req.params;
    let { email, password } = req.body;
    let q = "SELECT * FROM user WHERE id=?";
    connection.query(q, [id], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (result.length === 0) {
            return res.send("User not found");
        }
        let userData = result[0];
        if (email === userData.email && password === userData.password) {
            let q2 = "DELETE FROM user where id =?";
            connection.query(q2, [id], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    res.redirect("/");
                }
            })
        } else {
            return res.send("Invalid email or password");
        }
    })
})