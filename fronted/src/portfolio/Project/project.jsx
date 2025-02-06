import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import "./Project.css";
import "../../common/Card.jsx"
import Card from "../../common/Card.jsx";
import { Link } from "react-router-dom";
import ai from "../../assets/Project/ai.jpeg";
import gpt from "../../assets/Project/gpt.png";
import rga from "../../assets/Project/rga.jpeg";


const cardsData = [
    {
        image: ai,
        title: "AI-Powered Real Estate Matching",
        description: "Implemented GPT-4 for auto-generating property descriptions with high accuracy.",
        techStack: ["Python", "PyTorch", "OpenAI", "LLMs", "Seaborn"],
        liveLink: "#",
        github: "#",
    },
    {
        image: gpt,
        title: "GPT From Scratch – Personal Assistant and Classifier ",
        description: "Implemented GPT-4 for auto-generating property descriptions with high accuracy.",
        techStack: ["Python", "PyTorch"],
        liveLink: "#",
        github: "#",
    },
    {
        image: rga,
        title: " RAG-Deepseek  ",
        description: "Implemented GPT-4 for auto-generating property descriptions with high accuracy.",
        techStack: ["Python", "PyTorch"],
        liveLink: "#",
        github: "#",
    },
  
];


export default function Project() {
    return (
        <div className="sub-container">
            <div className="project-head">
                <h2>Projects</h2>
                <Link to="/projects">Learn more <HiOutlineArrowNarrowRight /></Link>
            </div>
            <hr />
            <div className="project-cards">
              
                    {cardsData.map((card, index) => (
                        <Card key={index} {...card} />
                    ))}
               
            </div>
        </div>
    );
}
