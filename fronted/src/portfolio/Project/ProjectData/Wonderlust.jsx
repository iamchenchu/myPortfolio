// src/portfolio/Project/ProjectData/Wonderlust.jsx
import React from "react";
import wonderlust from "../../../assets/Project/wonderlust.jpg";
import "./comman.css";
import Project from "../project";

export default function Wonderlust() {
    return (
        <div className="project-container">
            <div className="project-detail">
                <h2>Wonderlust - Full-Stack Travel Platform</h2>
                <p className="inline-image-text">
                    Wonderlust is a full-stack travel-booking platform where users can browse, create, and
                    review travel listings. It features secure authentication, image uploads, interactive
                    maps, and full CRUD on listings and reviews.
                </p>
                <img src={wonderlust} alt="Wonderlust travel platform" className="projectImg" />
                <h3>Technologies and Methods Used</h3>
                <div className="">
                    <h4>Frontend</h4>
                    <ul>
                        <li>EJS server-rendered views with responsive HTML/CSS and Bootstrap.</li>
                        <li>Interactive map rendering and client-side validation for listings.</li>
                    </ul>

                    <h4>Backend</h4>
                    <ul>
                        <li>Node.js + Express for server-side logic and RESTful routing.</li>
                        <li>Passport.js for authentication (sign-up, login, sessions).</li>
                    </ul>

                    <h4>Database &amp; Storage</h4>
                    <ul>
                        <li>MongoDB (Mongoose) for listings, reviews, and user data.</li>
                        <li>Cloud image storage for listing photos.</li>
                    </ul>

                    <h4>Key Features</h4>
                    <ul>
                        <li>Authentication &amp; authorization with protected routes.</li>
                        <li>Full CRUD on listings and nested reviews.</li>
                        <li>Server-side validation and robust error handling.</li>
                        <li>Responsive design across desktop, tablet, and mobile.</li>
                    </ul>

                    <h4>Architecture</h4>
                    <ul>
                        <li>MVC pattern for maintainable, scalable code.</li>
                        <li>RESTful endpoints connecting the views and the backend.</li>
                    </ul>
                </div>

                <p><strong>Tech Stack:</strong> Node.js, Express, MongoDB (Mongoose), EJS, Passport.js, Bootstrap</p>

                <a
                    href="https://miniwonderlust-project.onrender.com/listings"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link">
                    View Live Demo
                </a>
            </div>
            <Project/>
        </div>
    );
}
