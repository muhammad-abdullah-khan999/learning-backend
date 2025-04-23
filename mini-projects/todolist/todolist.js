import { Console } from "console";
import readline from "readline"

const rl = readline.createInterface({
    input : process.stdin, 
    output : process.stdout,
})

let todos = [];

function showMenu () {
    console.log("\n1. Add a Task");
    console.log("2. View Tasks");
    console.log("3. Exit");
    rl.question("Choose an Option ( 1, 2 ,3 ) : " , handleInput)
}

const handleInput = (Option) => {
    if(Option.trim() === "1") {
        rl.question("\nEnter a Task : " , (task) => {
            todos.push(task)
            console.log(`Task Added : ${task}`)
            showMenu()
        })
    } else if(Option.trim() === "2"){
        console.log("\nYour Todos List: ");
        todos.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`)
        });
        showMenu()
    } else if (Option.trim() === "3"){
        console.log("\nProgram Closed, Have a Nice Day")
        rl.close()
    } else {
        console.log("\nInvalid Input, Please Write a Valid Input ")
        showMenu()
    }
}

showMenu()