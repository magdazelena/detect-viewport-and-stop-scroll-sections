import React from 'react';
import { useInView } from 'react-intersection-observer'
import { useStyle as StyledSection } from './useStyle'

export default function Section(props) {
  const { children, id } = props
  const [ref, inView] = useInView({
    threshold: 0.05
  })
  if (inView) console.log(inView, id)
  return (
    <StyledSection ref={ref}>
      {children}
    </StyledSection>
  );
}
