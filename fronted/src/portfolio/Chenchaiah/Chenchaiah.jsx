
import "./Chenchaiah.css";
import chenchu from "../../assets/chenchu2.png";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Project from "../Project/project.jsx";
import Skill from "../Skills/Skill.jsx"
import { FaCheckCircle } from "react-icons/fa";


import { Link } from "react-router-dom";
import Education from "../Education/Education.jsx";
import EducationCard from "../Education/EducationCard.jsx";
import SkillCard from "../Skills/SkillCard.jsx";


const skillsData = {
    "Deep Learning": ["CNNs", "RNNs", "LSTMs", "GANs", "MLPs", "Autoencoders", "Deep Q-Networks", "DDPG", "Transformers"],
    "NLP": ["Text Preprocessing", "Text Classification", "NER", "Text Summarization", "Seq2Seq", "Transformers", "Word2Vec", "SpaCy", "NLTK"],
    "Tools & Libraries": ["PyTorch", "Keras", "TensorFlow", "NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "OpenCV", "Flask", "Django", "AWS", "Docker", "Kubernetes"],
    "Programming Languages": ["Python", "Java", "C++", "Cuda", "Go", "Julia", "Scala", "Rust", "JavaScript", "R"],
    "Machine Learning": ["Dimensionality Reduction", "Logistic Regression", "Decision Trees", "Random Forest", "SVM", "Hadoop", "Apache Kafka", "Databricks"],
};


export default function Chenchaiah() {



    return (
        <>

            <div className="me-container">

                <div className="my-bg-image">
                    <div className="me-para" >

                        <p> AI/ML &amp; LLM Inference Engineer — I make large models serve fast and cheap:
                            <br /><FaCheckCircle style={{ color: "green", fontSize: "24px" }} /> LLM Inference &amp; Serving (vLLM, TensorRT-LLM, Triton),
                            <br /> <FaCheckCircle style={{ color: "green", fontSize: "24px" }} /> KV-cache optimization &amp; continuous batching,
                            <br /> <FaCheckCircle style={{ color: "green", fontSize: "24px" }} /> Quantization &amp; GPU efficiency (H100 / A100),
                            <br /><FaCheckCircle style={{ color: "green", fontSize: "24px" }} /> LLMs, RAG &amp; Generative AI,
                            <br /> <FaCheckCircle style={{ color: "green", fontSize: "24px" }} />  Deep Learning &amp; NLP from first principles.
                        </p>
                    </div>
                </div>

            </div>

            <div className="about-main-container">
                <div className="intro">
                    <h1>About Me</h1>
                    <hr />
                    <p>
                        Hi, I am Chenchaiah Mekalathuru. <br />
                        I am an AI/ML &amp; LLM Inference Engineer. My focus is the serving layer of modern AI:
                        taking large language and multimodal models and making them fast, cheap, and reliable in production —
                        with vLLM, TensorRT-LLM, and Triton, and the techniques that actually move the numbers
                        (KV-cache management, continuous batching, prefix caching, chunked prefill, speculative decoding, and quantization).<br />
                        I optimize for the metrics that matter on a real GPU fleet: p95 time-to-first-token, inter-token latency,
                        throughput, and goodput-per-GPU — backed by deep-learning and NLP foundations built from first principles.
                    </p> <br />
                    <ul className="about-my-skills">
                        <li>⚡ LLM serving on H100/A100 — TTFT, inter-token latency, throughput &amp; goodput tuning.</li>
                        <li>🧠 KV-cache &amp; long-context research: Multi-Head Latent Attention + sliding-window attention.</li>
                        <li>🛠 5+ years across ML engineering, MLOps, and Generative AI; M.S. (AI), 4.0 GPA.</li>
                    </ul>
                    <br />
                    <ul>
                        <p>Check out <Link to="/resume">my CV</Link> and other pages:</p>
                        <li></li>
                    </ul>
                    <p>Contact Me:</p>
                    <p><a href="mailto:mekalathuru.chenchaiah@gmail.com">mekalathuru.chenchaiah@gmail.com</a></p>

                    <Link to="/about">Learn more <HiOutlineArrowNarrowRight /> </Link> <br />
                </div>

                <SkillCard />
                <EducationCard />
                <Project />
            </div>


        </>
    )
}