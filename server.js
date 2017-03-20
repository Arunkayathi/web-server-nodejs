const express = require("express");
const hbs = require('hbs');
const fs=require('fs');
var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.use((req,res,next)=>{
    var currentTime= new Date().toString();
    var log=`${currentTime}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server log',log+'\n',(err)=>{
        if(err)
        {
            console.log('unable to append to server.log');
        }
    
    next();
});
// app.use((req,res,next)=>{
//     res.render('maaintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: "Home Page",
        pageTitle: 'Home page',

    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        titleL: 'about page',
        pageTitle: 'about page',

    });
});
app.get('/bad', (req, res) => {
    res.send({
        error: "Unable to fulfill this request"
    });
});
app.listen(3000, () => {
    console.log('server started listening');
});
