require('colors');
const { inquireMenu, pause, readInput, listTasksDelete, confirm ,listTasksChecklist } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveDB');
const Tasks = require('./models/tasks');

//const {showMenu,pause} = require('./helpers/messages');

const main = async () => {
    let opt = '';
    const tasks = new Tasks();
    const tasksDB = readDB();
    if (tasksDB) {
        tasks.loadTasksFromDB(tasksDB);
    }

    do {
        //print menu
        opt = await inquireMenu();
        switch (opt) {
            case '1':
                //crate option
                const desc = await readInput('Description: ');
                tasks.createTask(desc);
                break;
            case '2':
                tasks.listAllTasks();
                break;
            case '3':
                tasks.listPendingCompleted(true);
                break;
            case '4':
                tasks.listPendingCompleted(false);
                break;
            case '5':
                const ids = await listTasksChecklist(tasks.arrList);
                tasks.toggleCompleted(ids);
                break;

            case '6':
                const id = await listTasksDelete(tasks.arrList);
                if (id !== '0') {
                    const ok = await confirm("Are you sure to delete?");
                    if (ok) {
                        tasks.deleteTask(id);
                        console.log("Deleted task");
                    }
                }
                break;
            default:
                break;
        }

        saveDB(tasks.arrList);

        if (opt !== '0')
            await pause();

    } while (opt !== '0')

    pause();
}

main();