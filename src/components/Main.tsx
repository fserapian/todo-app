import { ReactElement } from 'react';

import { TodoInterface } from '../types/TodoInterface';
import TodoItem from './TodoItem';

type MainProps = {
    todos: TodoInterface[],
    removeTodo: (id: string) => void,
    toggleTodo: (id: string) => void,
    updateTodo: (id: string, text: string) => void,
};

const Main = ({ todos, removeTodo, toggleTodo, updateTodo }: MainProps): ReactElement => {
    return (
        <ul className="main">
            {todos.map((todo: TodoInterface) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    removeTodo={removeTodo}
                    toggleTodo={toggleTodo}
                    updateTodo={updateTodo}
                />
            ))}
        </ul>
    );
};

export default Main;
