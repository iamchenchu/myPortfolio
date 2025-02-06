import "./about.css";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";

import image from "../../assets/About/fullimage.jpeg";
import image_2 from "../../assets/About/fullimage2.jpeg";
import image_3 from "../../assets/About/fullimage3.jpeg";
import image_4 from "../../assets/About/fullimage4.jpeg";
import image2 from "../../assets/About/pres.jpeg";
import Project from "../Project/project";
export default function about() {
    return (
        <>
            <div className="about-image">

            </div>
            <div className="main-container">
                <h2>About</h2>
                <hr />
                <div>
                    <p>
                        Experienced Data Scientist and Machine Learning Engineer with a deep AI research background and a strong track record of developing and managing scalable, AI-driven solutions. Currently advancing Liquid Neural Networks and Generative AI research at the Applied Artificial Intelligence lab, University of South Dakota, with a focus on NLP, Transformers, and vector-based AI applications. With expertise in cloud platforms like AWS and Azure, I bring hands-on experience in integrating AI/ML pipelines and automating DevOps processes across cloud-native infrastructures. <br />

                        Previously, as a Senior Manager at BYJUS, I led cross-functional teams to exceed performance benchmarks, managing complex projects from ideation through strategic solutions . Proficient in tools and technologies like LangChain, TensorFlow, PyTorch, Docker, Kubernetes, and infrastructure automation (Terraform, CloudFormation), I am adept at building CI/CD pipelines for AI/ML workloads and deploying containerized applications in environments like AWS ECS and EKS. <br />

                        A quick learner and T-shaped professional, I am passionate about leveraging AIOps and vector databases like Pinecone and FAISS for predictive analytics and operational automation. I thrive in collaborative settings, bringing a blend of technical depth and strategic management skills to every project. Let’s connect to discuss how I can contribute to driving AI-driven innovations and operational efficiencies within your team. <br />
                    </p>
                    <p>Follow me on : <a href="https://www.linkedin.com/in/iamchenchu/"><FaLinkedin /></a> &nbsp;
                        <a href="https://github.com/iamchenchu">  <FaGithub /></a> &nbsp;
                        <a href="https://medium.com/@chenchaiah.mekalathuru"><FaMedium /></a>  </p>
                </div>
              <br />
                <div>
                    <h2>President</h2>
                    <p>Applied Artificial Intelligence (𝟚ᗩ𝕀) Club</p>
                    <p>Aug 2024 - Dec 2024</p>
                    <p>Vermillion, South Dakota, United States </p>
                    <hr />
                    <div className="about-experience">
                        <ul>
                            <li><b>Led peer learning sessions</b> on the fundamentals of AI, guiding participants through the process of building a mini ChatGPT model from scratch</li>
                            <li><b>Engaged in research discussions</b> on cutting-edge AI advancements, staying updated with industry trends and emerging technologies.</li>
                            <li><b>Facilitated career development</b>, offering valuable insights from industry experts at MAANG companies to help individuals navigate their professional growth in AI and tech.</li>
                        </ul>
                        <img src={image} alt="" />

                    </div> <br />
                    <h2>Presentations & Lectures</h2>
                    <div className="all-images">
                  
                        <img src={image_2} alt="" />
                        <img src={image_3} alt="" />
                        <img src={image_4} alt="" />
                    </div>
                </div>
                <br />

                <div>
                    <h2>Research Assistant</h2>
                    <p><a href="https://www.linkedin.com/company/kc-2ai/posts/?feedView=all">USD Applied Artificial Intelligence Research Lab (𝟚ᗩ𝕀)</a></p>
                    <p>Aug 2023 - Dec 2024</p>
                    <hr />
                    <div className="about-experience">
                        <ul>
                            <li>Worked on Liquid Neural Networks, gained knowledge on multiple research papers (CTRNN, Neural ODE, NPCs) to build models on
                                LNN, also on state-of-the-art architectures in LLM's, NLP, Transformers, Fraud Detection, Generative Al which is resulting in an 80%
                                accuracy in model performance at least.</li>
                            <li>Contributed to two projects involving Liquid Neural Networks, focusing on building, training, and evaluating models while working on
                                diverse tasks related to mathematical software development. Developed a model for detecting cancer in images of various organs across
                                different modalities, achieving superior results with limited resources. Authored a research paper based on this work and submitted it to
                                CVPR 2025, currently awaiting the review outcome.</li>
                            <li>Enhanced understanding of machine learning and AI concepts among 10+ undergraduate students by guiding them in resolving their
                                doubts and queries, while efficiently managing lab operations using R for practical demonstrations.</li>
                            <li>Achieved high user satisfaction by using LLM-driven personalisation, dynamically adjusting property descriptions based on buyer
                                preferences. This demonstrated the impact of contextual augmentation and improved the overall user experience through personalised
                                content generation.</li>
                        </ul>
                        <img src={image2} alt="" />
                    </div>
                </div>
                <Project/>
             
            </div>
        </>
    )
}