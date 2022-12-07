
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
    OlEl = $("ol");
    // i have the list now. add list items in loop PREPEND
    var todoData = retriveFromStorage();
    updateCount(todoData);
    // var uniqueID_I = todoData.length - 1;
    console.log(todoData);
    // clear old list
    OlEl.empty();
    for (task of todoData) {
        OlEl.prepend(`<li>${task}</li>`);
    }
    // sets id to each list item
    var liEl = $("li");
    console.log(liEl)
    liEl.each(function (index, element) {
        $(element).attr("id", index);
        $(element).append("<button>Clear</button>");
        var LiBtnEl = $(`#${index} button`);
        LiBtnEl.attr("id", index);
        console.log("line 81");
    })
    updateCount(todoData);
}

generateTasks();

// generate clear button function RUN THIS FOR EACH TASK & GIVE ID

// remove to do function ????  WITHIN CALLBACK ON BUTTON PRESS

// update to do counter function INCLUDE WITHIN ABOVE CALLBACK MAYBE

function updateCount(todoData) {
    console.log(todoData)
    var todoDataLength = todoData.length
    var counterEl = $("#count");
    counterEl.text(todoDataLength);
    console.log("test");
}

$("button").click(function () {
    var currentElID = $(this).attr("id");
    clearFromStorage(currentElID);
    generateTasks();
    console.log($("button"));
})

function clearFromStorage(index) {
    var todoData = retriveFromStorage();
    todoData.splice(index, 1);
    todoDataString = JSON.stringify(todoData);
    localStorage.setItem("todoData", todoDataString);

}