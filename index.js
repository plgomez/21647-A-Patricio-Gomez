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
    res.render('index');
})

app.get('/ver', async function (req, res) {
    const posts = await Post.findAll();

    res.render('inicio', { posts: posts });
})

app.get('/agregar', async function (req, res) {
    const posts = await Post.findAll();

    res.render('nuevo')})

app.post('/agregar', async function (req, res) {
    const { titulo, contenido, imagen } = req.body

    try {
        const nuevoPost = await Post.create({
            titulo: titulo,
            contenido: contenido,
            imagen: imagen
        });

        if (nuevoPost) {
            res.redirect('/ver');
        } else {
            res.send('No se pudo agregar el nuevo posteo en el foro :(')
        }
    } catch (err) {
        res.send('Se produjo un errror al cargar el posteo: ' + err)
    }
})

//editar post del foro
app.get('/editar/:id', async function (req, res) {
    const { id } = req.params;

    try {
        const posteo = await Post.findOne({
            where: {
                id: id
            }
        })

        if (posteo) {
            res.render('editar', { post: posteo });
        } else {
            res.send('No se pudo encontrar el posteo para editar :(')
        }
    } catch (err) {
        res.send('Se produjo un errror al editar el posteo: ' + err)
    }
})

app.post('/editar/:id', async function (req, res) {
    const { id } = req.params;
    const { titulo, contenido, imagen } = req.body

    try {
        const postActualizado = await Post.update(
            {
                titulo: titulo,
                contenido: contenido,
                imagen : imagen
            }, {
                where: {
                    id: id
                }
            }
        )
        
        if (postActualizado) {
            res.redirect('/ver');
        } else {
            res.send('No se pudo actualizar el posteo :(')
        }
    } catch (err) {
        res.send('Se produjo un error al actualizar el posteo: ' + err)
    }
})

app.get('/eliminar/:id', async function (req, res) {
    const { id } = req.params;

    try {
        const borrarPost = await Post.destroy({
            where: {
                id: id
            }
        })

        if (borrarPost) {
            res.redirect('/');
        } else {
            res.send('No se pudo borrar el posteo :(')
        }
    } catch (err) {
        res.send('Se produjo un errror al borrar el posteo: ' + err)
    }
})



DBTest()


app.listen(PUERTO, ()=>{
    console.log("el servidor esta corriendo en el puerto " + PUERTO)
})
