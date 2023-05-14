/*
 * Prime Wheel effect
 * Copyright (c) 2023 Matthew Evans - See LICENSE.md
 * 
 * Sidebar code from:
 * https://javascript.plainenglish.io/create-a-reusable-sidebar-component-with-react-d75cf48a053a
 */

import "./Sidebar.css"
import React from "react"

const Sidebar = ({ width, height, children }) => {
  const [xPosition, setX] = React.useState(-width)

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0)
    } else {
      setX(-width)
    }
  }

  React.useEffect(() => {
    setX(0)
  }, [])

  return (
    <React.Fragment>
      <div
        className="side-bar"
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
          minHeight: height
        }}
      >
        <button
          onClick={() => toggleMenu()}
          className="toggle-menu"
          style={{
            transform: `translate(${width}px, 20vh)`
          }}
        ></button>
        <div className="content">{children}</div>
      </div>
    </React.Fragment>
  )
}

export default Sidebar