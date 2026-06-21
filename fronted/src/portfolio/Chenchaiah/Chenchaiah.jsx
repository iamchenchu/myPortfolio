import "./Chenchaiah.css";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import Project from "../Project/project.jsx";
import EducationCard from "../Education/EducationCard.jsx";
import SkillCard from "../Skills/SkillCard.jsx";
import Inference from "../Inference/Inference.jsx";

const heroChips = ["vLLM", "TensorRT-LLM", "Triton", "KV-cache", "Quantization", "H100"];

const heroStats = [
    { value: "2M+ / mo", label: "search hits served at BYJU'S (80% SSR)" },
    { value: "~826 ms", label: "p95 TTFT · 0 errors @ 50 users on 1×H100" },
    { value: "4.0 GPA", label: "M.S. Computer Science (AI)" },
];

export default function Chenchaiah() {
    return (
        <>
            <section className="hero">
                <div className="hero-inner">
                    <span className="hero-badge"><span className="hero-badge-dot" />Open to LLM inference &amp; serving roles</span>
                    <p className="hero-eyebrow">AI/ML · LLM INFERENCE &amp; SERVING</p>
                    <h1 className="hero-title">
                        I make large models <span className="hl">serve fast</span> &amp; cheap.
                    </h1>
                    <p className="hero-sub">
                        I&apos;m Chenchaiah Mekalathuru, an AI/ML &amp; LLM Inference Engineer. I tune the serving
                        layer for the metrics that decide its fate - p95 time-to-first-token, inter-token latency,
                        throughput and goodput-per-GPU - with vLLM, TensorRT-LLM, Triton, KV-cache management,
                        continuous batching, and quantization on H100/A100.
                    </p>

                    <div className="hero-chips">
                        {heroChips.map((c) => (
                            <span className="chip" key={c}>{c}</span>
                        ))}
                    </div>

                    <div className="hero-cta">
                        <Link to="/projects" className="btn btn-primary">
                            View projects <HiOutlineArrowNarrowRight />
                        </Link>
                        <Link to="/resume" className="btn btn-ghost">Resume</Link>
                        <a href="mailto:mekalathuru.chenchaiah@gmail.com" className="btn btn-ghost">Contact</a>
                    </div>

                    <Link to="/inference" className="hero-hook">
                        I self-host and serve models on my own GPUs, not just call APIs <HiOutlineArrowNarrowRight />
                    </Link>


                    <div className="hero-stats">
                        {heroStats.map((s) => (
                            <div className="stat" key={s.value}>
                                <b>{s.value}</b>
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="about-main-container">
                <div className="intro">
                    <p className="section-kicker">about</p>
                    <h2 className="section-title">From first principles, tuned for production</h2>
                    <p>
                        My focus is the inference and serving layer: taking large language and multimodal models and
                        making them fast, cheap, and reliable under real load. I care about systems that are not just
                        accurate but <em>measurably</em> efficient - backed by deep-learning and NLP foundations built
                        from the ground up.
                    </p>
                    <ul className="about-my-skills">
                        <li>LLM serving on H100/A100 - TTFT, inter-token latency, throughput &amp; goodput tuning.</li>
                        <li>KV-cache &amp; long-context research: Multi-Head Latent Attention + sliding-window attention.</li>
                        <li>5+ years across ML engineering, MLOps, and Generative AI; M.S. (AI), 4.0 GPA.</li>
                    </ul>
                    <p className="intro-contact">
                        <a href="mailto:mekalathuru.chenchaiah@gmail.com">mekalathuru.chenchaiah@gmail.com</a>
                    </p>
                    <Link to="/about" className="intro-more">Learn more <HiOutlineArrowNarrowRight /></Link>
                </div>

                <Inference />
                <SkillCard />
                <EducationCard />
                <Project />

                <section className="closing-cta">
                    <p className="section-kicker">let's talk</p>
                    <h2>Let&apos;s build inference systems that are <span className="hl">measurably</span> fast.</h2>
                    <p className="closing-cta-sub">
                        Open to LLM inference &amp; serving roles. The fastest way to reach me:
                    </p>
                    <div className="closing-cta-actions">
                        <a className="btn btn-primary" href="mailto:mekalathuru.chenchaiah@gmail.com">Email me</a>
                        <a className="btn btn-ghost" href="https://www.linkedin.com/in/iamchenchu/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <Link className="btn btn-ghost" to="/resume">Resume</Link>
                    </div>
                </section>
            </div>
        </>
    );
}
