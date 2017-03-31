
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var urlencodedParser=bodyParser.urlencoded({extended:false});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://anam:anam@ds147080.mlab.com:47080/todoapp');
var todoSchema=new mongoose.Schema({
    item:String
});
var Todo=mongoose.model('Todo',todoSchema); //model name that will be stored as collection in mongodb also schema that this model will base on
// var itemOne=Todo({item:'buy flowers'}).save(function(err){ //pushing items to db its todo object based on schema (itmone of type todo)
//     if(err) throw err;
//     console.log('item saved');
// });
// var data=[{item:'brush teeth'},{item:'hands wash'},{item:'perform prayers'}];
module.exports=function(app){
app.get('/todo',function(req,res){
    Todo.find({},function(err,data){
        if(err) throw err;
        res.render('todo',{todos:data});
    });

});
app.post('/todo',urlencodedParser,function(req,res){
// data.push(req.body);
var newTodo=Todo(req.body).save(function(err,data){
if (err) throw err;
res.json(data);
})

});
app.delete('/todo/:item',function(req,res){
    Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if( err) throw err;
        res.json(data);
    })
//  data=data.filter(function(todo){
//     return ((todo.item.replace(/ /g,'-'))!==(req.params.item));
// });
// res.json(data);
});
};