import styled from 'styled-components';
import { colors } from '../../utils/colors';

function getBackgroundColor(i, colorsIndex) {
  return `
        &:nth-child(${i + 1}) {
          background-color: ${colors[colorsIndex + 1]};
         }
      `;
}

function calculateBackgrounds() {
  let str = '';
  let colorsIndex = 0;
  for (let index = 0; index < 10; index += 1) {
    colorsIndex += 1;
    if (colorsIndex === colors.length - 1) colorsIndex = 0;
    str += getBackgroundColor(index, colorsIndex);
  }
  return str;
}

export const useStyle = styled.section`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  ${calculateBackgrounds()};
`;
