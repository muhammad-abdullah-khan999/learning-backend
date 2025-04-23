import readline from "readline"
import fs from "fs"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

let file = "";

const handleFileName = (filename) => {
    file = filename.trim();
    const handleAppendText = (textContent) => {
        let text = textContent;
        fs.appendFile(`${file}.txt`, `${text}` , (err) => {
            if (err) {
                console.log("Error Writing Text : ", err)
            } else ( console.log("Text Written"))
        })
        rl.close()
    }

    fs.writeFile(`${file}.txt` , "" , (err) => {
        if (err) {
            console.log('Error Creating File : ', err )
        } else ("file created successfully")
    })

    rl.question(`Enter the Text Content in ${file}.txt : `, handleAppendText)
}

function FileCreater() {
    rl.question("Enter the file name : ", handleFileName)
}

// Main Function
FileCreater()
