import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void;
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void;
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: PropsType) => {

    const [title, setTitle] = useState<string>('')

    const onClickAddTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        }
        setTitle('')
    }
        const onChangeInput = (e:ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        const onPressKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
            e.key === 'Enter' &&
            onClickAddTaskHandler()
        }
        
        const changeFilter = (filter: FilterValuesType) => {return () =>
            props.changeFilter(filter)
        }



    return (

        <div>
            <h3> {props.title} </h3>
            <div>
                <input value={title} onChange={onChangeInput}
                       onKeyPress={onPressKey}/>
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>

                {
                    props.tasks.map(t =>
                        <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span> {t.title} </span>
                            <button onClick={() => props.removeTask(t.id)}>x</button>
                        </li>
                    )
                }


            </ul>
            <div>
                <button onClick={changeFilter('All')}>All</button>
                <button onClick={changeFilter('Active')}>Active</button>
                <button onClick={changeFilter('Completed')}>Completed</button>
            </div>
        </div>

    );
}