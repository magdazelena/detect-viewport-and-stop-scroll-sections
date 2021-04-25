import React from 'react'

export default function Container({ children }) {
  const onVisibilityChange = (visible, id) => {
    console.log(visible, id)
  }
  return <div className="container">
    {children.map((child, key) => {
      return React.cloneElement(child, { key, onVisibilityChange })
    })}
  </div>
}