import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import "./Footer.css";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <>
            <div className="main-container">
                <div className="footer">
                    <div className="footer-left-side">
                        <p> &copy; {year} C.Mekalathuru</p>
                    </div>
                    <div className="footer-middle-side">
                        <ul>
                            <li>About</li>
                            <li>Contact</li>
                        </ul>
                    </div>


                    <div className="footer-right-side">
                        <a href="https://www.linkedin.com/in/iamchenchu/"><FaLinkedin /></a>
                        <a href="https://github.com/iamchenchu"><FaGithub /></a>
                        <a href="https://medium.com/@chenchaiah.mekalathuru"><FaMedium /></a>
                    </div>
                </div>

            </div>
        </>
    )
}