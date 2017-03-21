var person={
 firstname:'Ying-Ru',
 lastname:'Lai',

 greet:function(){
console.log(`Hello,${this.firstname}${this.lastname}`);
 }

    };

person.greet();
console.log(person['firstname']);

let name,phone;
let info={
name,
phone,
printinfo:function(){
    console.log(`Name: ${this.name},Phone: ${this.phone}`);
}
}

info.name="ntue";
info.phone="2732-1104";
info.printinfo();
