import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'

export default function Container({ children }) {
  const [openTopbar] = useSnackbar({ position: 'top-right' })
  const [openBottombar] = useSnackbar({ position: 'bottom-right' })

  const onVisibilityChange = (visible, id) => {
    if (visible) openTopbar(`Section ${id} is visible`)
    if (!visible) openBottombar(`Section ${id} is not visible`)
  }
  return <div className="container">
    {children.map((child, key) => {
      return React.cloneElement(child, { key, onVisibilityChange })
    })}
  </div>
}