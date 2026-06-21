import "./Education.css";
import lpu from "../../assets/Logo/lpu.jpeg";
import sd from "../../assets/Logo/sd.jpeg";

const educationData = [
    {
        degree: "Master of Science (M.S.), Computer Science - Artificial Intelligence",
        university: "University of South Dakota, Vermillion, SD",
        duration: "Aug 2023 - May 2025",
        logo: sd,
        gpa: "4.0 / 4.0",
        note: "12 graduate courses, every one Grade A",
        coursework: [
            { term: "2023 Fall", courses: ["High Performance Computing (CSC 525)", "Programming Science (CSC 751)", "Operating Systems / Architecture I (CSC 725)"] },
            { term: "2024 Spring", courses: ["Machine Learning Fundamentals (CSC 722)", "Advanced Artificial Intelligence (CSC 761)", "Internet of Things (CSC 592)"] },
            { term: "2024 Summer", courses: ["Quantum Computing (CSC 792)", "AI in Medical Imaging Informatics (CSC 787)"] },
            { term: "2024 Fall", courses: ["Distributed Systems (CSC 721)", "Pattern Recognition / Machine Learning (CSC 588)", "Computer Vision (CSC 752)"] },
        ],
    },
    {
        degree: "Bachelor of Science in Computer Science",
        university: "Lovely Professional University, Punjab, India",
        duration: "Aug 2015 - May 2019",
        logo: lpu,
        gpa: "3.5",
        skills: [
            "Programming & Development: Java, C++, Python, R, C, Web & Android Development",
            "Software Engineering: SDLC, Agile, Flask, Express.js, Django",
            "Databases: SQL, NoSQL, Database Management",
            "CS Fundamentals: Data Structures & Algorithms (DSA), OOP",
            "Frameworks & Tools: React.js, Node.js, REST APIs",
        ],
    },
];

export default function EducationCard() {
    return (
        <div className="sub-container">
            <div className="my-edu">
                <h1>🎓 Academic</h1>
                <hr />
                {educationData.map((edu, index) => (
                    <div key={index} className="education-card">
                        <h2>{edu.degree}</h2>
                        <div className="flex">
                            <img src={edu.logo} alt={edu.university} />
                            <strong>{edu.university}</strong>
                        </div>
                        <p>{edu.duration}</p>
                        <p>
                            <strong>GPA:</strong> {edu.gpa}
                            {edu.note && <span className="edu-note"> · {edu.note}</span>}
                        </p>

                        {edu.coursework && (
                            <>
                                <h4>Graduate Coursework</h4>
                                <div className="coursework">
                                    {edu.coursework.map((block) => (
                                        <div className="coursework-term" key={block.term}>
                                            <span className="term-label">{block.term}</span>
                                            <div className="course-pills">
                                                {block.courses.map((course) => (
                                                    <span className="pill" key={course}>{course}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {edu.skills && (
                            <>
                                <h4>Relevant Coursework & Skills</h4>
                                <ul>
                                    {edu.skills.map((skill, i) => (
                                        <li key={i}>{skill}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
