import { useState, useEffect, useRef, KeyboardEvent, ReactElement } from 'react';

import { TodoInterface } from '../types/TodoInterface';
import { StyledButton } from './styles/Button.styles';

type TodoItemProps = {
    todo: TodoInterface,
    removeTodo: (id: string) => void,
    toggleTodo: (id: string) => void,
    updateTodo: (id: string, text: string) => void,
};

const TodoItem = ({ todo, removeTodo, toggleTodo, updateTodo }: TodoItemProps): ReactElement => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingText, setEditingText] = useState<string>(todo.text);

    const itemStyle = todo.isCompleted ? 'line-through' : 'none';

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect((): void => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    });

    const handleChange = (): void => {
        toggleTodo(todo.id);
    };

    const handleDoubleClick = (): void => {
        setIsEditing(true);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            updateTodo(todo.id, editingText);
            setIsEditing(false);
        }
    };

    const cancelEditing = (): void => {
        setIsEditing(false);
        setEditingText(todo.text);
    };

    return (
        <>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        ref={inputRef}
                    />
                    <button onClick={cancelEditing}>Cancel</button>
                </div>
            ) : (
                <li className="todo-item" style={{ textDecoration: itemStyle }}>
                    <input
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={handleChange}
                    />
                    <span onDoubleClick={handleDoubleClick}>{todo.text}</span>{' '}
                    <StyledButton onClick={() => removeTodo(todo.id)}>Delete</StyledButton>
                </li>
            )}
        </>
    );
};

export default TodoItem;
