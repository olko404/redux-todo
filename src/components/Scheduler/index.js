// Core
import React, { Component } from 'react';
import { func, array } from 'prop-types';

// Instruments
import Styles from './styles';
import Checkbox from 'theme/assets/Checkbox';

// Components
import Task from 'components/Task';



export default class Scheduler extends Component {

    static defaultProps = { todos: []};

    static propTypes = {
        addTask: func.isRequired,
        todos:   array.isRequired,
    }
    
    state = {
        textValue: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();       

        if(this.state.textValue) {
            this.props.addTask(this.state.textValue); 
        }

        this.setState(() => ({
            textValue: '',
        }))
    }

    handleKeyPress = (e) => {
        const enterKey = e.key === 'Enter';
        
        if (enterKey) {
            this.handleSubmit(e);
        }
    }

    handleChange = (e) => {
        const { value } = e.target;

        this.setState(() => ({
            textValue: value,
        }))
    }

    complete = (id) =>
        this.setState(({ todos }) => ({
            todos: todos.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            }),
        }));

    changePriority = (id) =>
        this.setState(({ todos }) => ({
            todos: todos.map((todo) => {
                if (todo.id === id) {
                    todo.important = !todo.important;
                }
                return todo;
            }),
        }));

    completeAll = () =>
        this.setState(({ todos }) => ({
            todso: todos.map((todo) => {
                todo.completed = true;

                return todo;
            }),
        }));

    render () {
        const { textValue } = this.state;
        const { todos, deleteTask, updateTasks  } = this.props;
            
        const allCompleted = todos.every((todo) => todo.completed);
        
        const todoList = todos.map(({ id, message, completed, favorite }) => (
            <Task
                changePriority = { this.changePriority }
                complete = { this.complete }
                completed = { completed }
                deleteTask = { deleteTask }
                updateTasks = { updateTasks }
                favorite = { favorite }
                id = { id }
                key = { id }
                message = { message }
            />
        ));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = 'search' />
                    </header>
                    <section>
                        <form 
                            onSubmit = { this.handleSubmit } >
                            <input 
                                placeholder = 'Описание моей новой задачи' 
                                type = 'text' 
                                value = { textValue } 
                                onChange = { this.handleChange } 
                                onKeyPress = { this.handleKeyPress }
                            />
                             <button type = 'submit'>Добавить задачу</button>
                        </form>
                        <ul>{ todoList ? todoList : 'No tasks' }</ul>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { allCompleted }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this.completeAll }
                        />
                        <code>Все задачи выполнены</code>
                    </footer>
                </main>
            </section>
        );
    }
}
