var taskInput = document.getElementById('taskinput');
var todoBtn = document.getElementById('todo-btn');
var todoContainer = document.getElementById('todo-container');
var mySelect = document.getElementById('myselect');
var searchInput = document.getElementById('searchinput');

var allTodos = [];

if(localStorage.getItem('alltodos') != null){
    allTodos   = JSON.parse(localStorage.getItem('alltodos'));
    display(allTodos);
}



todoBtn.addEventListener('click',function(){
    var task ={
        taskDetails : taskInput.value ,
        isCompleted : false ,
        id : `${Math.random()*10000}-${Math.random()*10000}`
    }
    allTodos.push(task);
    localStorage.setItem('alltodos', JSON.stringify(allTodos))
    display(allTodos);
    clear();
})

function display(arr){
    var cartoona ="";
    for (var task of arr) {
       cartoona+=` <div class="row mt-4  display ${task.isCompleted == true ? "completed" : ""} ">
       <div class="col-md-8 bg-dark py-3">
           <p>${task.taskDetails}</p>
       </div>
       <div class="col-md-2 bg-success py-3 d-flex justify-content-center align-items-center fs-6" onclick="becompleted('${task.id}')"><i
               class="fa-solid fa-check"></i></div>
       <div class="col-md-2 bg-danger py-3 d-flex justify-content-center align-items-center fs-6" onclick="deleteTodo('${task.id}')"><i
               class="fa-solid fa-trash"></i></div>
   </div>
       ` 
    }

    todoContainer.innerHTML = cartoona;
}

function becompleted(id){
   var index = allTodos.findIndex(function(task){return task.id == id});
   console.log(index);
   allTodos[index].isCompleted = allTodos[index].isCompleted == true ? false : true;
   localStorage.setItem('alltodos', JSON.stringify(allTodos))
   displayAcordingToSelectValue();

}

mySelect.addEventListener('change',function(){
    displayAcordingToSelectValue ()
   
})

function displayAcordingToSelectValue (){
    switch(mySelect.options[mySelect.options.selectedIndex].value){
        case 'All':
            display(allTodos);
            break;
        case 'completed':
           var completedFilter = allTodos.filter(function(task){return task.isCompleted == true})   
           display(completedFilter) ;
           break;
        case 'Uncompleted':
            var unCompletedFilter = allTodos.filter(function(task){return task.isCompleted == false})    
            display(unCompletedFilter) ;           
    }
}


function deleteTodo(id){
   var index = allTodos.findIndex(function(task){return task.id == id})
    allTodos.splice(index,1)
    display(allTodos);
    localStorage.setItem('allTodos',JSON.stringify(allTodos));
}


searchInput.addEventListener('input',function(e){
    var searchResult =[];
    for(var i=0 ; i<allTodos.length ; i++){
        if(allTodos[i].taskDetails.toLowerCase().includes(e.target.value.toLowerCase())){
            searchResult.push(allTodos[i]) 
        }
    }
    display(searchResult);
})

function clear(){
    taskInput.value='';
}