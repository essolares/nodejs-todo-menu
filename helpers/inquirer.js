const inquirer = require('inquirer');
const ListPrompt = require('inquirer/lib/prompts/list');
require('colors');

const menuOpt = [
    {
        type: 'list',
        name: 'option',
        message: 'Select your option',
        choices: [
        {
            value: '1',
            name: `${'1-'.green} Create task`
        },
        {
            value: '2',
            name: `${'2-'.green} List all tasks`
        },
        {
            value: '3',
            name: `${'3-'.green} List completed tasks`
        },
        {
            value: '4',
            name: `${'4-'.green} List pending tasks`
        },
        {
            value: '5',
            name: `${'5-'.green} Complete tasks`
        },
        {
            value: '6',
            name: `${'6-'.green} Delete tasks`
        },
        {
            value: '0',
            name: `${'0-'.green} Exit`
        }
    ]
    }
]

const inquireMenu = async () => {
    console.clear();
    console.log('======================'.green);
    console.log('Select your option');
    console.log('======================\n'.green);
    const {option} = await inquirer.prompt(menuOpt);
    return option;

}

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue\n`
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);

}

const readInput = async (message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if (value.length===0){
                return 'Please insert  a value'
            }
            return true;
        }
    }]
    const {desc} =  await inquirer.prompt(question);
    return desc;
}

const listTasksDelete = async(tasks = []) => {
    const choices = tasks.map( (task,idx) => {
        const i =  `${idx + 1}`.green;
        return {
            value: task.id,
            name: `${i} ${task.desc}`
        }
    });
    choices.unshift({
        value: '0',
        name: `0. `.green + `Cancel`
    })
    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]
    const {id} = await inquirer.prompt(questions);
    return id;
}

const confirm = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message,
    }]
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const listTasksChecklist = async(tasks = []) => {
    const choices = tasks.map( (task,idx) => {
        const i =  `${idx + 1}`.green;
        return {
            value: task.id,
            name: `${i} ${task.desc}`,
            checked: (task.completed ? true : false)
        }
    });
    
    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(questions);
    return ids;
}

module.exports = {
    inquireMenu,
    pause,
    readInput,
    listTasksDelete,
    confirm,
    listTasksChecklist,
}