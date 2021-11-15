const Task = require("./task")


class Tasks{
    _list = {};
    constructor(){
        this._list = {};
    }
    get arrList(){
        const arr = [];
        Object.keys(this._list).forEach((key)=>{
            const task = this._list[key];
            arr.push(task);
        });
        return arr;

    }

    deleteTask(id = ''){
        if (this._list[id]){
            delete this._list[id];
        }
    }

    loadTasksFromDB (tasks = []){
        tasks.forEach((task)=>{
            this._list[task.id]=task;
        })
    }

    createTask(desc = ''){
        const task = new Task(desc);
        this._list[task.id]= task;
    }

    listAllTasks(){
        this.arrList.forEach((task,idx)=>{
            const i = `${idx+1}-`.green;
            const {desc, completed} = task;
            const state = (completed) ? 'Completed'.green : 'Pending'.red;
            console.log(`${i} ${desc} :: ${state}`);
        })
    }

    listPendingCompleted(completedTask = true){
        let count = 0;
        this.arrList.forEach((task,idx)=>{
            const {desc, completed} = task;
            const state = (completed) ? 'Completed'.green : 'Pending'.red;
            if (completedTask){
                if (completed){
                    count+=1;
                    console.log(`${(count + '.').green} ${desc} :: ${completed}`);
                }
            }else {     
                if (!completed){
                    count+=1;
                    console.log(`${(count + '.').green} ${desc} :: ${state}`);
                }
            }
        })
    }

    toggleCompleted = (ids=[]) => {
        ids.forEach( id => {
            const task = this._list[id];
            if (!task.completed) {
                task.completed = new Date().toISOString();
            }
        })
        this.arrList.forEach(task =>{
            if (!ids.includes(task.id)){
                this._list[task.id].completed = null; 
            }
        })
    }
}

module.exports = Tasks;