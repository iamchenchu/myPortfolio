import "./Chenchaiah.css";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import Project from "../Project/project.jsx";
import EducationCard from "../Education/EducationCard.jsx";
import SkillCard from "../Skills/SkillCard.jsx";

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
                    <p className="hero-eyebrow">// AI/ML · LLM INFERENCE &amp; SERVING</p>
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
                        <Link to="/resume" className="btn btn-ghost">Résumé</Link>
                        <a href="mailto:mekalathuru.chenchaiah@gmail.com" className="btn btn-ghost">Contact</a>
                    </div>

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
                    <p className="section-kicker">// about</p>
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

                <SkillCard />
                <EducationCard />
                <Project />
            </div>
        </>
    );
}
