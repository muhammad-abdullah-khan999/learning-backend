import chalk from "chalk";
import { get } from "http";
import https from "https"
import readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const getJoke = () => {
    const url = "https://official-joke-api.appspot.com/random_joke";
    let data = "";
    let joke = "";

    https.get(url , (res) => {
        res.on("data" , (chunk) => {
            data += chunk ;
        })
        res.on("end", () => {
            joke = JSON.parse(data)
            console.log('\nHere is your random',chalk.green(`${joke.type}`),'joke : ')
            console.log(chalk.yellow(`${joke.setup}`));
            console.log(chalk.bgRed(`${joke.punchline}\n`));
            runProgram();
            });      
        })
    }

const runProgram = () => {
    rl.question("\nDo you want to See Another Joke : Yes / No \n", (res) => {
        if (res.trim().toLowerCase() === "y" || res.trim().toLowerCase() === "yes") {
            getJoke();
        } else if(res.trim().toLowerCase() === "n" || res.trim().toLowerCase() === "no") {
            rl.close();
        } else {
            console.log("Invalid Input")
            runProgram()
        }
})}

getJoke();