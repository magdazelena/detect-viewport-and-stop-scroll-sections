import React from 'react'

export default function Container({ children }) {
  const onVisibilityChange = (visible, id) => {
    console.log(visible, id)
  }
  return <div className="container">
    {children.map((child, index) => {
      return React.cloneElement(child, { onVisibilityChange })
    })}
  </div>
}