var express=require('express');
var todoController=require('./controllers/todoController');
var app=express();
app.set('view engine','ejs'); //localhost:3000/assets/public
app.use(express.static('./public'));//serve statci files
todoController(app);
app.listen(3000,function(){
    console.log('u r listening to port3000');
});