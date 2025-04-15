import { ReactNode } from "react"

import './Header.css';


interface Props {
    left: ReactNode;
    right: ReactNode;
}

const Header = ( { left, right } : Props  ) => {
  return (
    <header>
        <div className="left-content">
          {left} {/* This can be other content you want in the left part */}
        </div>
        <div className="right-content">{right}</div>
    </header>
  )
}

export default Header