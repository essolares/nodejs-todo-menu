require('colors');


const showMenu = () => {
    return new Promise((resolve, reject) => {
        console.clear();
        console.log('======================'.green);
        console.log('Select your option'.green);
        console.log('======================\n'.green);

        console.log(`${'1-'.green} Create task`);
        console.log(`${'2-'.green} Task list`);
        console.log(`${'3-'.green} Completed task list`);
        console.log(`${'4-'.green} Pending task list`);
        console.log(`${'5-'.green} Complete tasks`);
        console.log(`${'6-'.green} Delete tasks`);
        console.log(`${'7-'.green} Exit \n`);


        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question('Select your option: ', (opt) => {
            readline.close();
            resolve(opt);
        })

    })


};

const pause = () => {
    return new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`\nPress ${'ENTER'.green} to continue\n`, (opt) => {
            readline.close();
            resolve();
        })
    })
}

module.exports = { showMenu, pause };