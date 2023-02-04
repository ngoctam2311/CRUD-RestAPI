// function User (first, last, avatar){
//     this.first = first;
//     this.last = last;
//     this.avatar= avatar;
//     this.getName= function (){
//         return `${this.first} ${this.last}`;
//     }
// }

// User.prototype.className= 'yeu thuong';
// User.prototype.getNamea= function(){
//     return this.className;
// }
// var other =  new User('tam','dinh','dz');
// other.title='vip bro';

// console.log(other.className); 
// console.log(other.getNamea());

// var ramdom = Math.floor(Math.random()*100);
// if(ramdom<30){
//     console.log('cường hóa thành công');
// }
// var game= [
//     '5 coin',
//     '10 coin',
//     '15 coin',
//     '25 coin'
// ]

// console.log(game[ramdom]);

// var orders = [
//     {
//         name: 'Khóa học HTML - CSS Pro',
//         price: 3000000
//     },
//     {
//         name: 'Khóa học Javascript Pro',
//         price: 2500000
//     },
//     {
//         name: 'Khóa học React Pro',
//         price: 3200000
//     }
// ]
// function getTotal (arr){
//     var total=0;
//     for(var i=0;i<arr.length;i++){
//         total += arr[i].price;
//         console.log(total)
//     }
//     return total;
// }

// getTotal(orders) 

// var ngu = {
//     name: 'tam',
//     age: 21
// }

// for( var myobj of Object.values(ngu)){
//     console.log(myobj);
// }


// var orders = [
//     {
//         name: 'Khóa học HTML - CSS Pro',
//         price: 3000000
//     },
//     {
//         name: 'Khóa học Javascript Pro',
//         price: 2500000
//     },
//     {
//         name: 'Khóa học React Pro',
//         price: 3200000
//     }
// ]

// var total = 0 ;
// for(var couses of orders){
//   total += couses.price;
  
// }
// console.log(total)
// redduce
// Array.prototype.reduce2 = function(callback,result){
//     let i=0;
//     if(arguments.length < 2){
//         i=1;
//         result = this[0];
//     }
//     for(;i<this.length;i++){
//         result = callback(result,this[i],i,this)
//     }
//     return result;
// }
// var myReduce = orders.reduce2(function(acc , current){
//       return acc+current.price;
// })
// console.log(myReduce)

// var course= [1,2,3,4];

// Array.prototype.map2 = function(callback){
     
//     for(var i=0;i<this.length;i++){
//       var result=( callback(this[i],i));
//       console.log(result)
//     }
//     return result;
// }

// var myarray = course.map2(function(number){
//     return number *2;
// })

// console.log(myarray)

// var orders = [
//     {
//         name: 'Khóa học HTML - CSS Pro',
//         price: 3000000
//     },
//     {
//         name: 'Khóa học Javascript Pro',
//         price: 2500000
//     },
//     {
//         name: 'Khóa học React Pro',
//         price: 3200000
//     }
// ]

// var myfilter = orders.filter(function(course,index){
//     return course.price > 2600000;
// })

// console.log(myfilter);

// const readline = require('readline');
// const r= readline.createInterface({input: process.stdin});
// r.on('line',(input)=>{
//      var [a,b]=input.split(' ').map(Number);
//      for(var i=a;i<=b;i++){
//       console.log(i);
//      }
// })

// 

var postApi = 'http://localhost:3000/profile';
var IDul = document.querySelector('#list-couse');

function getCourses(){
   fetch(postApi)
     .then(function(reponse){
            return reponse.json();
     })
     .then(function(courses){
         var htmls ='';
         for(var i=0;i<courses.length;i++){

            htmls +=`<li class="idCourse-"+${courses[i].id}>
            <h2>${courses[i].name}</h2>
            <p>${courses[i].description}</p>
            <button onclick= HandlerDelete(${courses[i].id})>Xóa</button>
            <button onclick=HanderUpdate(${courses[i].id})>Sửa</button>
            </li>`
                    
         }
         
         IDul.innerHTML= htmls;    
     })
}

function CreateCourse(){
   var CreateHand = document.querySelector('#create');
   CreateHand.onclick = function(){
      var name=document.querySelector('input[name="name"]').value;
      var description=document.querySelector('input[name="description"]').value;
      
      var data = {
         name: name,
         description: description
      }
      fetch(postApi,{
         method:'POST',
         headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
       .then(function(Response){
         return Response.json();
       })
       .then(function(){
         getCourses();
       })
   }
}
function HandlerDelete(id){
    fetch(postApi+"/"+id,{
      method:'DELETE',
      headers: {
         'Content-Type': 'application/json'
       } 
    })
    .then(function(Response){
      return Response.json();
    })
    .then(function(){
      getCourses();
    })
     
}
function HanderUpdate(id){
    var SaveUpdate = document.querySelector('#update');
    SaveUpdate.onclick = function(){
      var name=document.querySelector('input[name="name"]').value;
      var description=document.querySelector('input[name="description"]').value;
      data1={
         name:name,
         description:description
      }
      fetch(postApi+"/"+id,{
         
            method:'PUT',
            headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify(data1) 
      })
      .then(function(Response){
         return Response.json();
      })
      .then(function(){
         getCourses();
      })
    }
    fetch(postApi)
     .then(function(Response){
      return Response.json();
     })
     .then(function(course){
       for(var i=0;i<course.length;i++){
         if(id===course[i].id){
            document.querySelector('input[name="name"]').value =course[i].name;
            document.querySelector('input[name="description"]').value=course[i].description;

         }
       }
     })

}
getCourses();
CreateCourse();