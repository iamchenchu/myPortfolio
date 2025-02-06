import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./Navbar.css";
export default function Navbar(){

    return(
        <>
        <div className="main-navbar-container">
            <div className="navbar">
              <div className="left-side">
                <p><Link to="/">Chenchiah Mekalathuru</Link> </p>
              </div>
              <div className="middle-side">
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/projects">Projects</Link> </li>
                <li><Link to="/skills">Skills</Link></li>
                <li><Link to="/education">Education</Link></li>
                <li><Link to="/experience">Experience</Link></li>
                <li><Link to="/certificates">Certificates</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/resume">Resume</Link></li>
              </ul>
              </div>
              <div className="right-side">
               <a href="https://www.linkedin.com/in/iamchenchu/"><FaLinkedin/></a> 
               <a href="https://github.com/iamchenchu">  <FaGithub/></a>
              <a href="https://medium.com/@chenchaiah.mekalathuru"><FaMedium/></a>  
              </div>
            </div>
        </div>
        </>
    )

}