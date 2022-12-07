
var todoInputEl = $("#todoInput[type=text]");
// console.log(todoInputEl);

// $(todoInputEl).keydown(function () {
//     console.log("test"); //works till here
// });

$(todoInputEl.keydown(getsTodo))

// function getUserInput() {
//     console.log("test");
// }

function getsTodo() {
    var enterPressed = (event.which === 13);

    if (enterPressed) {
        var todoVal = todoInputEl.val();
        console.log(todoVal);
        addToStorage(todoVal);
        generateTasks();
    }
}

function addToStorage(taskVal) {

    var todoData = retriveFromStorage();

    todoData.push(taskVal);
    console.log("if-else works" + `: ${todoData}`);
    todoDataString = JSON.stringify(todoData);
    localStorage.setItem("todoData", todoDataString);

    // console.log(event.which === 13); // gives back true when enter pressed
    // console.log(todoInputEl.val()) // gives back input field info.
};

function retriveFromStorage() {

    // get item in JSON
    var todoData = JSON.parse(localStorage.getItem("todoData"));
    var todoDataExists = (todoData !== null);

    console.log("line 31" + `${todoDataExists}`)
    if (!todoDataExists) {
        console.log(todoData); //array of strings
        // initialises new todo empty array so to add strings
        todoData = [];
    }
    return todoData
}

// -------------- call these on getsTodo --------------

// generate tasks function

function generateTasks() {
    // get ordered list element
    OlLi = $("ol");
    // i have the list now. add list items in loop PREPEND
    var todoData = retriveFromStorage();
    var uniqueID_I = todoData.length - 1;
    console.log(todoData);
    // clear old list
    OlLi.empty();
    for (task of todoData) {
        OlLi.prepend(`<li>${task}</li>`).attr(`id="${uniqueID_I}"`);
        // OlLi.prepend(`<li id="${uniqueID_I}">
        // ${task}
        // <button id="${uniqueID_I}">Clear<button>
        // </li>`);
        uniqueID_I--;
        console.log("counter");
    }
}

generateTasks();

// generate clear button function RUN THIS FOR EACH TASK & GIVE ID

// remove to do function ????  WITHIN CALLBACK ON BUTTON PRESS

// update to do counter function INCLUDE WITHIN ABOVE CALLBACK MAYBE

var clear