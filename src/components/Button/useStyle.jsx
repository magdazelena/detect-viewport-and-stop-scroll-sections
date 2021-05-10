import styled from 'styled-components';

export const useStyle = styled.button`
  border: 1px solid black;
  border-radius: 6px;
  background-color: #salmon;
  padding: 30px;
  font-size: 30px;
  cursor: pointer;
  &:hover {
    background-color: pink;
  }
`