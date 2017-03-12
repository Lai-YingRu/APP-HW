var person={
firstname:'Ying-Ru',
lastname:'Lai',
getfullname:function(
){
    var fullname=this.firstname+''+this.lastname;
    return fullname;
}
}

var logname = function(){
    console.log('logged: '+this.getfullname());
}

var logpersonname = logname.bind(person);
logpersonname();

// bind-2
let greet = function(fn){
    fn();
};

let person2 = {
    name:'Nana',
    hello: function(){
        console.log(`Hello ${this.name}`);
    },
    sayHello: function(){
        greet(this.hello);
    }
};
person2.sayHello();

// bind-3
let greet2 = function(fn){
    fn();
};

let person3 = {
    name3:'Nana2',
    hello3: function(){
        console.log(`Hello ${this.name3}`);
    },
    sayHello3: function(){
        greet2(this.hello3.bind(this));
    }
};
person3.sayHello3();

//array fn
let greet4 = function(fn){
    fn();
};
let newPerson = {
    na:'123',
    sayhi: function(){
        greet4(
            ()=>console.log(`Hello ${this.na}`)

        );
    }

};
newPerson.sayhi();