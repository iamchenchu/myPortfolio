import React from "react";
import "./project.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";



// Import Project Images
import bitcoin from "../../assets/Project/bitcoin.jpg";
import wonderlust from "../../assets/Project/wonderlust.png";
import ai from "../../assets/Project/ai.jpeg";
import gpt from "../../assets/Project/gpt.png";
import rga from "../../assets/Project/rga.jpeg";
import algorithm from "../../assets/Project/algorithm.webp";
import { Link } from "react-router-dom";


const projectsData = [
    {
        id:"infertutor",
        image: gpt,
        title: "InferTutor Arena - Multimodal LLM Serving on vLLM + Modal",
        description: "Deployed Qwen3-VL on vLLM/Modal H100s and tuned continuous batching, prefix caching & chunked prefill to drive down p95 TTFT and inter-token latency while raising goodput-per-GPU.",
        techStack: ["vLLM", "Modal", "H100", "KV-cache", "Continuous Batching", "Load Testing"],
        liveLink: "#",
        github: "#",
        page:"/project/infertutor",
    },
    {
        id:"mla",
        image: algorithm,
        title: "Sliding-Window MLA - Bounded KV Cache for Long Context",
        description: "Research combining DeepSeek-V2 latent KV (MLA) with sliding-window local attention and a few global anchors to match full-MLA quality at an O(window + anchors) cache - a flat ~198 KB vs 1.4 GB for full MLA at 1M tokens; RULER / LongBench quality benchmarks are the next milestone.",
        techStack: ["PyTorch", "MLA", "Decoupled RoPE", "Long-Context", "RULER", "LongBench"],
        liveLink: "#",
        github: "#",
        page:"/project/mla",
    },
    {
        id:"byjus-wiz",
        image: gpt,
        title: "BYJU'S WIZ - In-House GPTs (BADRI · MathGPT · TeacherGPT)",
        description: "My contributions to BYJU'S generative-AI suite and the architectures behind it: self-hosted LLaMA/LLaMA-2 tutoring, math reasoning, and doubt-solving on AWS GPUs (SageMaker / TorchServe), with era-accurate building blocks (MHA, BERT, RoBERTa, T5, GPT-2, LoRA/QLoRA) - no MLA/vLLM anachronism.",
        techStack: ["LLaMA-2", "RAG", "BERT/RoBERTa", "SageMaker", "TorchServe", "MHA / QLoRA"],
        liveLink: "#",
        github: "#",
        page:"/project/byjus-wiz",
    },
    {
        id:"gpt",
        image: gpt,
        title: "GPT From Scratch - 124M Decoder-Only Transformer",
        description: "Built a 124M-parameter GPT from scratch (BPE tokenizer, multi-head self-attention, 12 decoder blocks), loaded GPT-2 weights, and fine-tuned it for classification and instruction tasks.",
        techStack: ["Python", "PyTorch", "Transformers", "BPE"],
        liveLink: "#",
        github: "#",
        page:"/project/gpt",
    },
    {
        id:"rga",
        image: rga,
        title: "RAG-DeepSeek - Conversational AI over PDFs",
        description: "Retrieval-augmented chat over documents using DeepSeek-R1 (Ollama), LangChain, and FAISS/ChromaDB with sub-second retrieval and a Streamlit UI.",
        techStack: ["LangChain", "FAISS", "ChromaDB", "DeepSeek-R1", "Streamlit"],
        liveLink: "#",
        github: "#",
        page:"/project/rga",
    },
    {
        id:"ai-powered",
        image: ai,
        title: "AI-Powered Real Estate Matching",
        description: "GPT-4 + vector search (ChromaDB) that converts buyer preferences into structured queries and auto-generates personalized property descriptions in under 15 seconds per listing.",
        techStack: ["Python", "OpenAI", "ChromaDB", "RAG", "NLP"],
        liveLink: "#",
        github: "#",
        page:"/project/ai",
    },
    {
        id:"bitcoin",
        image: bitcoin,
        title: "Bitcoin Predict - Time Series Forecasting",
        description: "Built a deep learning model using TensorFlow for Bitcoin price prediction.",
        techStack: ["Python", "TensorFlow", "Pandas", "Matplotlib"],
        liveLink: "#",
        github: "#",
        page:"/project/bitcoin",
    },
    {
        id:"wonderlust",
        image: wonderlust,
        title: "Wonderlust - Full Stack Travel Platform",
        description: "Developed a full-stack MERN travel booking system with real-time updates.",
        techStack: ["React", "Node.js", "MongoDB", "Express"],
        liveLink: "https://miniwonderlust-project.onrender.com/listings",
        github: "#",
       page:"/project/wonderlust",
    },


];

export default function Projects() {
    return (
        <div className="project-container">
            <h1>🚀 My Projects</h1>
            <div className="projects-list">
                {projectsData.map((project, index) => (
                    <div key={index} className="project-item">
                        <img src={project.image} alt={project.title} className="project-image" />

                        <div className="project-details">
                            <p className="project-title">{project.title}</p>
                            <p className="project-description">{project.description}</p>

                            <div className="tech-stack">
                                {project.techStack.map((tech, idx) => (
                                    <span key={idx} className="tech-badge">{tech}</span>
                                ))}
                            </div>

                            {/* <div className="project-links">
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                    <FaGithub /> GitHub
                                </a>
                            </div> */}
                            <Link to={project.page}  className="project-link">See Details</Link>
                        </div>
                    </div>
                ))}
            </div>
     
        </div>
    );
}
