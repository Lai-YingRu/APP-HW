//push
let a=["1","2"];
console.log(a);
a.push('3');
console.log(a);

//slice
let a =['zero','one','two','three'];
let sliced = a.slice(1,3);

console.log(a);
console.log(sliced);


//for each
var color = ['red','blue','green'];
//loop method
for(var i=0;i < color.length; i++){
  console.log(color[i]);
}
//foreach method
color.forEach(
(color)=>console.log(color)
);

//Map
var number = [1,2,3];
var doublenumber;

//loop method
doublenumber=[];
for(var i=0;i<number.length; i++){
  doublenumber.push(number[i]*2);
}
console.log(doublenumber);

//foreach method
doublenumber2=[];
doublenumber2=number.map(
(number)=>number*2
);
console.log(doublenumber2);
//Map2
var cars=[
  {model:'Buick',price:'cheap'},
  {model:'BMW',price:'expensive'}
];

var prices=cars.map((cars)=>cars.price);
console.log(prices);
