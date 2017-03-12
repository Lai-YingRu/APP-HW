//json
var  personobj ={
    firstname:"Simon",
    fullname:"",
    age:37,
    married:true,
    hasOwnhair:null,
    children:[{
        firstname:"Erica"
    },{
        firstname:"Albert"
    }]

};

var personjson = JSON.stringify(personobj,null,3);
console.log(personobj);
console.log(personjson);