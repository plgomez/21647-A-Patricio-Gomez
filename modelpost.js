const { DataTypes } = require('sequelize');
const { sequelize } = require('./database.js');



const Post = sequelize.define('Post', {
    titulo: {
        type: DataTypes.STRING,
    },
    contenido: {
        type: DataTypes.STRING,
    },
    imagen: {
        type: DataTypes.STRING,
        //defaultValue: "https://midu.dev/images/tags/node.png",
    },
}, 
{

    });

//sincronizamos la DB y creamos las tablas a partir del modelo lo comento para que no se ejecute siempre
//Post.sync({forece : true});
//console.log("The table for the Post model was just (re)created!");
    

module.exports = Post;