import { ReactElement, KeyboardEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TodoInterface } from '../types/TodoInterface';
import { StyledButton } from './styles/Button.styles';

type HeadProps = {
    addTodo: (data: TodoInterface) => void,
    toggleComplete: () => void,
};

const Head = ({ addTodo, toggleComplete }: HeadProps): ReactElement => {
    const [text, setText] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const newTodo = {
                id: uuidv4(),
                text,
                isCompleted: false,
            };

            addTodo(newTodo);

            setText('');
        }
    };

    const handleClick = (): void => {
        setIsActive(!isActive);
        toggleComplete();
    };

    return (
        <div className="head">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <StyledButton onClick={handleClick} $active={isActive}>Toggle complete</StyledButton>
        </div>
    );
};

export default Head;
