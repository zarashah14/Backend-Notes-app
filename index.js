const express = require("express");
const app = express();
const path = require ('path');
const fs = require ('fs');


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));  //static files vanila javascript images frontend css etc 

app.get('/', function(req, res){
    fs.readdir(`./files`, function (err, files){  //jab ya cheez hojay to nicha wala code chalao....
        res.render("index", {files: files});
    })
});

//two
app.get('/file/:filename', function(req, res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8" , function (err, filedata){
        res.render('show.ejs', {filename: req.params.filename, filedata: filedata });
    })
});


app.post('/create', function(req, res){
     fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        res.redirect("/")
     })   //split array //join nothing
});

app.listen(3000);