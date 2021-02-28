import React from 'react';
import { useStyle as StyledSection } from './useStyle';

// eslint-disable-next-line react/prop-types
export default function Section({ children }) {
  return (
    <StyledSection>
      {children}
    </StyledSection>
  );
}
