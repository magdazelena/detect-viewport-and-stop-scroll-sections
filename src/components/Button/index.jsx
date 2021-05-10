import React from 'react'
import { useStyle as StyledButton } from './useStyle'

export default function Button(props) {
  return <StyledButton onClick={props.resumeScroll}>
    Click to resume scroll
  </StyledButton>
}
