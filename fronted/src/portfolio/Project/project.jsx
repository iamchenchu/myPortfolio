import React from "react";
import Slider from "react-slick";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./Project.css";
import bitcoin from "../../assets/Project/bitcoin.jpg";
import wonderlust from "../../assets/Project/wonderlust.png";
import ai from "../../assets/Project/ai.jpeg";
import gpt from "../../assets/Project/gpt.png";
import rga from "../../assets/Project/rga.jpeg";
import algorithm from "../../assets/Project/algorithm.webp";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Custom Next Arrow Component
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div 
      className={className} 
      style={{ ...style, display: "block", right: "10px", zIndex: 2 }}
      onClick={onClick}
    >
      &#62;
    </div>
  );
};

// Custom Prev Arrow Component
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div 
      className={className} 
      style={{ ...style, display: "block", left: "10px", zIndex: 2 }}
      onClick={onClick}
    >
      &#60;
    </div>
  );
};

const cardsData = [
    {
        id:"infertutor",
        image: gpt,
        title: "InferTutor Arena - Multimodal LLM Serving on vLLM + Modal",
        description: "Deployed Qwen3-VL on vLLM/Modal H100s and tuned continuous batching, prefix caching & chunked prefill to drive down p95 TTFT and inter-token latency.",
        techStack: ["vLLM", "Modal", "H100", "KV-cache", "Load Testing"],
        liveLink: "#",
        github: "#",
        page:"/project/infertutor",
    },
    {
        id:"mla",
        image: algorithm,
        title: "Sliding-Window MLA - Bounded KV Cache for Long Context",
        description: "Research: combines DeepSeek-V2 latent KV (MLA) with sliding-window attention + global anchors to match full-MLA quality at an O(window + anchors) cache.",
        techStack: ["PyTorch", "MLA", "Long-Context", "RULER", "LongBench"],
        liveLink: "#",
        github: "#",
        page:"/project/mla",
    },
    {
        id:"gpt",
        image: gpt,
        title: "GPT From Scratch - 124M Decoder-Only Transformer",
        description: "Built a 124M-parameter GPT from scratch (BPE, multi-head attention, decoder blocks), loaded GPT-2 weights, and fine-tuned it for classification.",
        techStack: ["Python", "PyTorch", "Transformers", "BPE"],
        liveLink: "#",
        github: "#",
        page:"/project/gpt",
    },
    {
        id:"rga",
        image: rga,
        title: "RAG-DeepSeek - Conversational AI over PDFs",
        description: "Retrieval-augmented chat over documents using DeepSeek-R1 (Ollama), LangChain, and FAISS/ChromaDB with sub-second retrieval.",
        techStack: ["LangChain", "FAISS", "DeepSeek-R1", "Streamlit"],
        liveLink: "#",
        github: "#",
        page:"/project/rga",
    },
    {
        id:"ai-powered",
        image: ai,
        title: "AI-Powered Real Estate Matching",
        description: "GPT-4 + vector search (ChromaDB) that turns buyer preferences into structured queries and auto-generates personalized property descriptions.",
        techStack: ["Python", "OpenAI", "ChromaDB", "RAG"],
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

export default function Project() {
  // Updated slider settings with autoplay and custom arrows
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000, // slide changes every 3 seconds
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="sub-container">
      <div className="project-head">
        <h1>Projects</h1>
        <Link to="/projects">
          Learn more <HiOutlineArrowNarrowRight />
        </Link>
      </div>
      <hr />
      <Slider {...settings} className="project-slider">
        {cardsData.map((card, index) => (
          <div className="card-wrapper" key={index}>
            <div className="card">
              <div className="card-header">
                <img src={card.image} alt={card.title} />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div className="tech-stack">
                  {card.techStack.map((tech, idx) => (
                    <span key={idx}>{tech}</span>
                  ))}
                </div>
              </div>
              <div className="card-links">
                <Link to={card.page} className="read-more">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
