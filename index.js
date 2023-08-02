const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

var tarefas = ['Arrumar cama', 'Limpar area'];

app.post('/', (req, res) => {
    tarefas.push(req.body.tarefa);

    res.render('index', { tarefas: tarefas });
})

app.get('/', (req, res) => {
    res.render('index', { tarefas: tarefas });
})

app.get('/deletar/:id', (req, res) => {

    tarefas = tarefas.filter((valor, index) => {
        if (index != req.params.id) {
            return valor;
        }
    })

    res.render('index', { tarefas: tarefas });
})

app.listen(5000);