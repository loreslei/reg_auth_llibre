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

//Open Route Private Route
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

    //check if user exists
    const existingUser = await User.findOne({email: email});
    if(existingUser){
        return res.status(422).json({msg:'Usuário já existe!'});
    }

    //create password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const user = new User({
        name,
        email,
        password: hashedPassword,
        });
        try {
            await user.save();
            res.status(201).json({msg:'Usuário criado com sucesso!'});
        } catch (error) {
            console.error(error);
            res.status(500).json({msg: 'Ocorreu um erro inesperado. Tente novamente mais tarde!'});
        }
});


// Login User
app.post('/auth/login', async(req, res)=>{
    const {email, password} = req.body;
    //validations
    if(!email ||!password){
        return res.status(422).json({msg:'Todos os campos são obrigatórios!'});
    }

    //check if user exists
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(404).json({msg:'Usuário não encontrado!'});
    }

    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(422).json({msg:'Senha inválida!'});
    }

    try {
        const secret = process.env.secret
        const token = jwt.sign({
            id: user._id}, secret, 
            {expiresIn: '1h'});
            res.status(200).json({msg:"Login feito com sucesso!", token});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Ocorreu um erro inesperado. Tente novamente mais tarde!'});
    }
});

//Credencials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.a6hcx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
    app.listen(3000);
    console.log('MongoDB conectado com sucesso!')
}).catch((err)=> console.error(err))
