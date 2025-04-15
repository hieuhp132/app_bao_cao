import { ReactNode } from "react";
import './Body.css';

interface Props {
  left: ReactNode;
  right: ReactNode;
}


const Body = ({left, right} : Props) => {
  return (
    <main className="body-layout">
      <div className="left">{left}</div>
      <div className="right">{right}</div>
    </main>
  )
}

export default Body