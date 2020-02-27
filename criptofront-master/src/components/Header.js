import React from 'react';
import '../styles/header.css'
import { Link} from 'react-router-dom'

const Header = props =>{
    return (
        <header className = "header">
      
        <text className = "header-text"> {props.title} </text>
        <text>
        <Link to= "/" className = "nav-item" > home</Link> </text>
        </header>
         

    );

}

export default Header;