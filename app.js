const express=require('express');
const app=express();
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/demo2');
const db=mongoose.connection;
const personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
 });
 const Person = mongoose.model("Person", personSchema);
 app.get('/person', function(req, res){
    res.render('person');
 });
 app.post('/person', function(req, res){
    var personInfo = req.body; //Get the parsed information
    
    if(!personInfo.name || !personInfo.age || !personInfo.nationality){
       res.render('show_message', {
          message: "Sorry, you provided worng info", type: "error"});
    } else {
       var newPerson = new Person({
          name: personInfo.name,
          age: personInfo.age,
          nationality: personInfo.nationality
       });
         db.collection('info').insertOne(newPerson);
       newPerson.save(function(err, Person){
          if(err)
             res.render('show_message', {message: "Database error", type: "error"});
          else
             res.render('show_message', {
                message: "New person added", type: "success", person: personInfo});
       });
    }
 });