// let promise = new Promise ((resolve,reject)=>{
//     resolve();
// });

// promise 
//     .then(()=>console.log('Work is finished!!'))
//     .then(()=>comsole.log('Again finished!'))
    // .catch(()=>console.log('uh oh!'));

let promise = new Promise ((resolve,reject)=>{
    reject();
});

promise 
    .then(()=>console.log('Work is finished!!'))
    .then(()=>comsole.log('Again finished!'))
    .catch(()=>console.log('uh oh!'));