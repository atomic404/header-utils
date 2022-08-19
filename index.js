const LBL = require('line-by-line');
const colors = require('colors');
const fs = require('fs');
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout })

const VERSION = "1.0";

function askQuestions() {
    console.clear();
    console.log(`Header Sorting Tools - v${VERSION}`.bgBlue);
    console.log(`[0] Convert raw headers to name value pairs for objects`.blue);
    console.log(`[1] Raw Headers to C# req.AddHeader()`.blue);

    console.log(`\n`)

    readline.question(`Please select an option from above (0 - 99):\n`.red, async (userInput) => {
        console.clear();
        userInput = parseInt(userInput);

        if (userInput > 99 || userInput < 0) {
            console.log(`bad: ${userInput}`)
            return askQuestions();
        } else {
            switch (userInput) {
                case 0: return require('./modules/module1')();
                case 1: return require('./modules/module2')();

                default: askQuestions();
            }
            readline.close();
        }
    })
}
askQuestions()
