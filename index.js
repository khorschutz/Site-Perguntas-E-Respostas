const express = require("express");
const app = express();
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");


//DATABASE conexão

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados.");
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

//estou dizendo para express usar EJS como view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Rotas


app.get("/",(req, res) => {
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']    
    ]}).then(questions => {
        res.render("index",{
            questions: questions
        });
    });
});

// função - renderiza pagina de receber perguntas
app.get("/makequestion", function(req, res){
    res.render("questions.ejs");
});

// função abreviada - rota que recebe dados das perguntas
app.post("/savequestion", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    });
});


app.get("/perguntaId/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(questions => {
        if(questions != undefined){
            Resposta.findAll({
                where: {pergId: questions.id},
                order: [
                    ["id", "DESC"]
                ]
            }).then(respostas => {
                res.render("perguntaId", {
                questions: questions,
                respostas: respostas
                });
            });
        }else{
            res.redirect("/");            
        }
    })
});


app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var pergId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        pergId: pergId
    }).then(() => {
        res.redirect("/perguntaId/" + pergId)
    });
});

app.listen(8181, function(){
    console.log("App rodando!")
});