import { ReactElement, useState } from 'react';

import Head from './components/Head';
import Main from './components/Main';
import Footer from './components/Footer';
import { TodoInterface } from './types/TodoInterface';
import { FilterEnum } from './types/FilterEnum';

function App(): ReactElement {
    const [todos, setTodos] = useState<TodoInterface[]>([]);
    const [filter, setFilter] = useState<FilterEnum>(FilterEnum.ALL);

    const getInfo = (): string | null => {
        if (todos.length > 0) {
            return 'Double click on text to edit';
        }
        return null;
    };

    const info = getInfo();

    const getVisibleTodos = (): TodoInterface[] => {
        if (filter === FilterEnum.ACTIVE) {
            return todos.filter((todo: TodoInterface) => !todo.isCompleted);
        }

        if (filter === FilterEnum.COMPLETED) {
            return todos.filter((todo: TodoInterface) => todo.isCompleted);
        }

        return todos;
    };

    const visibleTodos: TodoInterface[] = getVisibleTodos();

    const getActiveItemsLeft = (todos: TodoInterface[]): number => {
        const activeTodos = todos.filter((todo) => !todo.isCompleted);
        return activeTodos.length;
    };

    const itemsLeft = getActiveItemsLeft(todos);

    const handleAddTodo = (todo: TodoInterface): void => {
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
    };

    const handleRemoveTodo = (id: string): void => {
        const newTodos = todos.filter((todo: TodoInterface) => todo.id !== id);
        setTodos(newTodos);
    };

    const handleChangeFilter = (filter: FilterEnum): void => {
        setFilter(filter);
    };

    const handleToggleTodo = (id: string): void => {
        setTodos((prev: TodoInterface[]) => prev.map((todo: TodoInterface) => {
            if (todo.id === id) {
                return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
        }));
    };

    const handleUpdateTodo = (id: string, text: string): void => {
        setTodos((prev: TodoInterface[]) => prev.map((todo: TodoInterface) => {
            return todo.id === id ? { ...todo, text } : todo;
        }));
    };

    const handleToggleComplete = () => {
        setTodos((prev: TodoInterface[]) => prev.map((todo: TodoInterface) => {
            return { ...todo, isCompleted: !todo.isCompleted };
        }));
    };

    return (
        <div className="App">
            <Head
                addTodo={handleAddTodo}
                toggleComplete={handleToggleComplete}
                info={info}
            />
            <Main
                todos={visibleTodos}
                removeTodo={handleRemoveTodo}
                toggleTodo={handleToggleTodo}
                updateTodo={handleUpdateTodo}
            />
            <Footer
                itemsLeft={itemsLeft}
                changeFilter={handleChangeFilter}
                filter={filter}
            />
        </div>
    );
}

export default App;
