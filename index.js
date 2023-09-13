require('dotenv').config();

const express = require('express');
const app = express();
const { DBTest } = require('./database.js');
const PUERTO = process.env.PUERTO;
const Post = require('./modelpost.js');

// Middlewares
//app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configurar EJS como motor de plantilla
app.set('view engine', 'ejs');

app.get('/', async function (req, res) {
    const posts = await Post.findAll();

    res.render('inicio', { posts: posts });
})

app.get('/agregar', async function (req, res) {
    const posts = await Post.findAll();

    res.render('nuevo')})

app.post('/agregar', async function (req, res) {
    const { titulo, descripcion, imagen } = req.body

    try {
        const nuevoPost = await Post.create({
            titulo: titulo,
            descripcion: descripcion,
            imagen: imagen
        });

        if (nuevoPost) {
            res.redirect('/');
        } else {
            res.send('No se pudo agregar el nuevo posteo en el foro :(')
        }
    } catch (err) {
        res.send('Se produjo un errror al cargar el posteo: ' + err)
    }
})



DBTest()


app.listen(PUERTO, ()=>{
    console.log("el servidor esta corriendo en el puerto " + PUERTO)
})