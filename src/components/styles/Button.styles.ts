import styled from 'styled-components';

export const StyledButton = styled.button<{ $active?: boolean; }>`
  /* Adapt the colors based on active prop */
  background: ${(props) => props.$active ? '#616161' : '#FFF'};
  color: ${(props) => props.$active ? '#FFF' : '#616161'};

  font-size: 0.8rem;
  margin: 0 0.2rem;
  padding: 0.25em 1em;
  border: 2px solid #616161;
  border-radius: 3px;
  cursor: pointer;
`;
