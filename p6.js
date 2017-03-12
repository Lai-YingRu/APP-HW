'use strict'
class Person{
    constructor (name){
        this.name=name;
    }
    printGreeting(){
        console.log(`Hi!I am ${this.name}`);
    }
}

var person1=new Person ('Andy');
person1.printGreeting();

var person1=new Person ('Amy');
person1.printGreeting();

//2

class Employee extends Person {
    constructor (name,job){
        super(name);
        this.job=job;
    }
    printGreeting(){
        super.printGreeting();
        console.log(`Hi!I am ${this.name} and I am a ${this.job}!`);
    }
}

var person3=new Employee('Adrew','Teacher');
person3.printGreeting();

var person4=new Person ('Ben');
person4.printGreeting();

//prototype

Person.prototype.printGreeting = function(){
    console.log(`Hi! I am ${this.name}, and I have been changed!`);
}

person1.printGreeting();
person3.printGreeting();