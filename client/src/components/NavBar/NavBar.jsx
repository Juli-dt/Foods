import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faGithub , faLinkedin , faWpforms} from '@fortawesome/free-brands-svg-icons'

export default function NavBar() {
//     return (
//         <ul className={styles.menu}>
//             <li><Link to='/home' className={styles.a}>Home <FontAwesomeIcon icon={faHome} size="2x" style={{padding: '5px'}} /> </Link> </li>
//             <li><Link to='/create' className={styles.a}>Create your own recipe! <FontAwesomeIcon icon={faWpforms} size="2x" style={{padding: '5px'}} /></Link> </li>
//             <li><a href="https://www.linkedin.com/in/tomascontreras-fsd/"
//             target="_blank" rel="noreferrer" className={styles.a}>LinkedIn <FontAwesomeIcon icon={faLinkedin} size="2x" style={{padding: '5px'}} /></a></li>
//             <li> <a href="https://github.com/tomasignacioc"
//             target="_blank" rel="noreferrer" className={styles.a}>GitHub <FontAwesomeIcon icon={faGithub} size="2x" style={{padding: '5px'}} /></a></li>
//             <li className={styles.slider}></li>
//         </ul>
//     )
}