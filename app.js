const express = require('express');
const app = express();



app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static('node_modules/bootstrap/dist/css'));
app.use(express.static('node_modules/bootstrap/dist/js'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/angular'));
app.use(express.static('node_modules/angular-route'));
app.use(express.static('node_modules/popper.js/dist/umd'));
app.use(express.static('views/'));



app.use(function(req, res, next){
    res.render('index');
});


app.listen(4000,()=>{
    console.log('server is listening at Port 4000');
});