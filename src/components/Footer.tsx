import { ReactElement } from 'react';

import { FilterEnum } from '../types/FilterEnum';
import { StyledButton } from './styles/Button.styles';

type FooterProps = {
    itemsLeft: number,
    changeFilter: (filter: FilterEnum) => void,
    filter: FilterEnum,
};

const Footer = ({ itemsLeft, changeFilter, filter }: FooterProps): ReactElement => {
    return (
        <div className="footer">
            <span>items left: {itemsLeft}</span>{' '}
            <span>
                <StyledButton
                    $active={filter === FilterEnum.ALL}
                    onClick={() => changeFilter(FilterEnum.ALL)}
                >
                    All
                </StyledButton>
                <StyledButton
                    $active={filter === FilterEnum.ACTIVE}
                    onClick={() => changeFilter(FilterEnum.ACTIVE)}
                >
                    Active
                </StyledButton>
                <StyledButton
                    $active={filter === FilterEnum.COMPLETED}
                    onClick={() => changeFilter(FilterEnum.COMPLETED)}
                >
                    Completed
                </StyledButton>
            </span>
        </div>
    );
};

export default Footer;
