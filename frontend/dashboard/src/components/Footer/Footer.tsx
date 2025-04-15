import { ReactNode } from "react"
import './Footer.css';

interface Props {
    children: ReactNode

}

const Footer = ({children} : Props) => {
  return (
    <footer>
        {children}
    </footer>
  )
}

export default Footer