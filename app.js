require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

//Config JSON response
app.use(express.json());

//Models
const User = require('./models/User');
//Open Route Public Route
app.get('/', (req, res) =>{
    res.status(200).json({msg:'Bem vindo a nossa API!'})
});

//Register User
app.post('/auth/register', async(req, res) =>{

    const{name, email, password, confirmpassword} = req.body;
    //validations
    if(!name ||!email ||!password ||!confirmpassword){
        return res.status(422).json({msg:'Todos os campos são obrigatórios!'});
    }
    
    if(password!==confirmpassword){
        return res.status(422).json({msg:'Senhas não conferem!'});
    }
    //Check if user already exists
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(422).json({msg:'Usuário já existe!'});
    }
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //Create new user
    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    await user.save();
    //Generate token

});

//Credencials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.a6hcx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
    app.listen(3000);
    console.log('MongoDB conectado com sucesso!')
}).catch((err)=> console.error(err))
