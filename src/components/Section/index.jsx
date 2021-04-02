import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer'
import { useStyle as StyledSection } from './useStyle'

export default function Section(props) {
  const { children, id, onVisibilityChange } = props
  const [visible, setVisible] = useState(false) //previous state
  const [ref, inView] = useInView({
    threshold: [0.05, 0.9]
  })
  useEffect(() => {
    if (inView !== visible) {
      setVisible(inView)
      onVisibilityChange(inView, id)
    }
  }, [inView])

  return (
    <StyledSection ref={ref}>
      {children}
    </StyledSection>
  );
}
