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
    const pdf = `${import.meta.env.BASE_URL}Chenchaiah.pdf`;
    return (
        <>
            <div className="about-image">
              <div className="about-me">
              <h1> Hi, I am Chenchaiah Mekalathuru.</h1>
              <h3>Click <a href={pdf}>here</a> to download my CV and check out <a href={import.meta.env.BASE_URL}>my portfolio</a> to see my work.</h3>
              </div>
            </div>
            <div className="about-main-container">
                <h2>About</h2>
                <hr />
                <div className="about-head">
                    <p>
                        AI/ML &amp; LLM Inference Engineer with a research background and a strong track record of building and serving scalable, AI-driven systems. My focus is the inference and serving layer: making large language and multimodal models fast, cheap, and reliable in production with vLLM, TensorRT-LLM, and Triton - optimizing the metrics that decide a serving system&apos;s fate (p95 time-to-first-token, inter-token latency, throughput, goodput-per-GPU) through KV-cache management, continuous batching, prefix caching, chunked prefill, speculative decoding, and quantization on H100/A100. <br />

                        Most recently I researched long-context efficiency - Sliding-Window MLA, which combines DeepSeek-V2 latent KV compression with sliding-window attention and global anchors to bound the KV cache - and built InferTutor Arena, a multimodal LLM serving system on vLLM + Modal load-tested under concurrent traffic. Earlier, as a Senior Machine Learning Engineer at BYJU&apos;S, I shipped neural search, recommendations, and computer-vision systems serving millions of users, deploying models with Flask/FastAPI, Docker, and Kubernetes. <br />

                        I am comfortable across the stack - PyTorch and CUDA up through MLOps (AWS ECS/EKS, Terraform, CI/CD) and vector databases (FAISS, ChromaDB, Pinecone) for RAG. I care about systems that are not just accurate but <em>measurably</em> efficient under real load. Let&apos;s connect to talk about LLM inference, serving, and long-context efficiency. <br />
                    </p>
                    <p>Follow me on : <a href="https://www.linkedin.com/in/iamchenchu/"><FaLinkedin /></a> &nbsp;
                        <a href="https://github.com/iamchenchu">  <FaGithub /></a> &nbsp;
                        <a href="https://medium.com/@chenchaiah.mekalathuru"><FaMedium /></a>  </p>
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
                        </ul>
                        <img src={image2} alt="" />
                    </div>
                </div>
                <br />
                <div className="about-middle">
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
                        <a href="https://www.linkedin.com/in/iamchenchu/recent-activity/all/" target="_blank" rel="noopener noreferrer">
                            <img src={image_2} alt="image1" />
                        </a>
                        <a href="https://www.linkedin.com/in/iamchenchu/recent-activity/all/" target="_blank" rel="noopener noreferrer">
                            <img src={image_3} alt="image2" />
                        </a>
                        <a href="https://www.linkedin.com/in/iamchenchu/recent-activity/all/" target="_blank" rel="noopener noreferrer">
                            <img src={image_4} alt="image3" />
                        </a>
                    </div>
                </div>
              

              
                <Project />

            </div>
        </>
    )
}