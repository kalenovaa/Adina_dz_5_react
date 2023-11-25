import React from "react";
import {useState} from "react";
import AddTodo from "./AddTodo";
import TaskList from "./TaskList";

let nextId = 3;
const initialTodos = [
    {id: 0, title: 'купить молока', done: false},
    {id: 1, title: 'купить сыр', done: false},
    {id: 2, title: 'купить мясо', done: false}
]

export default function TaskApp() {
    const [todos, setTodos] = useState(initialTodos)
    const [filter,setFilter] = useState("")
    function handleAddTodo(title){
        setTodos([
            ...todos,
            {
                id: nextId++,
                title:title,
                done: false
            }
        ])
    }
    function handleSearch(e) {
        const inputValue = e.target.value;
        setFilter(inputValue);
        setTodos((prevTodos) =>
            initialTodos.filter((todo) =>
                todo.title.toLowerCase().includes(inputValue.toLowerCase())
            )
        );
    }

    function handleChangeTodos(nextTodo){
        setTodos(todos.map(t =>{
            if (t.id === nextTodo.id) {
                console.log(t)
                return nextTodo;
            }else{
                return t;

            }
        }))
    }
    function handleDeleteTodo(todoId){
        setTodos(todos.filter((t) => t.id !== todoId));
    }
    return(
        <>
            <input onChange={handleSearch} value={filter} type="text" placeholder="поиск" name="filter" id= "filter" />
            <AddTodo onAddTodo={handleAddTodo}/>
            <TaskList
                todos={todos}
                onChangeTodo={handleChangeTodos}
                onDelete={handleDeleteTodo}
            />

        </>
    )
}