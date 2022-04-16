import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import { v1 } from 'uuid';

export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {
    console.log(typeof v1())
    const title = "React-TS todoList"
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'HTML/CSS', isDone: false},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Redux', isDone: true}
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('All')

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t =>
            t.id !== id
        )
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
id: v1(), title, isDone: false
        }
        // const copyTask = [... tasks];
        // copyTask.push(newTask);
        // setTasks(copyTask);

        setTasks([newTask, ...tasks])
    }

    let tasksForTodoList = tasks;
    if (filter === 'Active') {
        tasksForTodoList = tasks.filter(t =>
            !t.isDone
        )
    } else if (filter === 'Completed') {
        tasksForTodoList = tasks.filter(t =>
            t.isDone
        )
    }

    const changeFilter = (value: FilterValuesType) => {
        return setFilter(value)
    }


    return (
        <div className="App">
            <TodoList title={title} tasks={tasksForTodoList} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}/>

        </div>
    );
}

export default App;
