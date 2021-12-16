const express = require('express');
const nodemailer = require('nodemailer')
const fs = require('fs');
const { getMaxListeners } = require('process');
const app = express();
const Port = 3000;
app.set('view engine' , 'ejs');
app.set('views' ,__dirname + '/views');
app.use("/", express.static('static'))

app.use(express.urlencoded())

app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/about',(req,res)=>{
    res.render('about');
});

app.get('/contact',(req,res)=>{
    res.render('contact');
});

app.get('/events',(req,res)=>{
    res.render('Gallery');
});
app.post('/submit',(req,res)=>{
    var number = req.body.number;
    var feedback = req.body.feedback
    var transpoter = nodemailer.createTransport({
        service :'gmail',
        auth: {
            user:'thor172010@gmail.com',
            pass:'Marvel123@17#'
        }
    });
    var mailOptions ={
        from:'thor172010@gmail.com',
        to:req.body.email,
        subject:'WELCOME',
        text:req.body.subject+`
        ${number}`
    }
    transpoter.sendMail(mailOptions,function(error ,info){
        if(error){
            console.log(error);
        }else{
            res.render('yepsies')
        }
    })
});
app.listen(Port, ()=>{
    console.log('Server is on');
});
