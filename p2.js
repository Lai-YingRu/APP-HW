// //spread operator
// let array1=[1,2,3];
// let array2=[4,5,6];
// let array3=[array1,array2];
// console.log(array3);
// let array4=[...array1,...array2];
// console.log(array4);

// function adder (base,...number){
//     number.forEach(function(number){
//         console.log(base+number);
//     });
// }

// adder(3,5,7,1);


let state = {a:1,b:2,c:3};
console.log(state);
state = {...state, d:4};
console.log(state);