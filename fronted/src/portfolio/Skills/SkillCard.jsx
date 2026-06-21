import Project from "../Project/project";
import "./skill.css";

const skillsData = {
    "LLM Inference & Serving": [
        "vLLM", "TensorRT-LLM", "SGLang", "Triton Inference Server", "TGI",
        "Continuous / in-flight batching", "PagedAttention & KV-cache management",
        "Prefix caching", "Chunked prefill", "Speculative decoding",
        "Quantization (FP8 / INT8 / INT4, AWQ, GPTQ)", "Tensor & pipeline parallelism",
        "TTFT / inter-token latency / throughput / goodput", "p50–p99 latency SLOs",
        "Modal", "Ray Serve", "GPU profiling (Nsight)", "H100 / A100"
    ],
    "LLMs & Generative AI": [
        "Transformers (decoder / encoder)", "RAG & vector search", "Fine-tuning (LoRA / QLoRA)",
        "Multi-Head Latent Attention (MLA)", "GQA / MQA", "Long-context attention",
        "Agents (LangChain, LangGraph, LlamaIndex)", "Hugging Face", "Ollama",
        "FAISS / ChromaDB / Pinecone", "Prompt & context engineering", "LLM evaluation"
    ],
    "Deep Learning & ML": [
        "PyTorch", "TensorFlow", "Keras", "CUDA", "CNNs / RNNs / LSTMs", "GANs",
        "Autoencoders", "Reinforcement Learning (DQN, DDPG)", "Liquid Neural Networks",
        "Scikit-learn", "XGBoost / Gradient Boosting", "Time-series (ARIMA, Prophet)",
        "Computer Vision (YOLO, U-Net, OpenCV)", "NumPy / Pandas"
    ],
    "MLOps & Infrastructure": [
        "Docker", "Kubernetes", "FastAPI / Flask", "gRPC / REST", "AWS (ECS / EKS / SageMaker)",
        "GCP", "Azure", "Terraform", "Airflow", "Kubeflow", "CI/CD", "MLflow",
        "Apache Spark / Kafka", "Databricks", "Snowflake / BigQuery", "Load testing & observability"
    ],
    "Programming Languages": [
        "Python", "C/C++", "CUDA", "Go", "Rust", "Java", "Scala", "JavaScript / React", "SQL", "R"
    ]
};

export default function SkillCard() {
    return (
        <div className="skills-container">
            <p className="section-kicker">// stack</p>
            <h2 className="section-title">Technical Skills</h2>

            <div className="skills-groups">
                {Object.entries(skillsData).map(([category, skills], index) => (
                    <div
                        className={`skill-group${index === 0 ? " skill-group--feature" : ""}`}
                        key={category}
                    >
                        <h3 className="skill-group-title">
                            {index === 0 && <span className="skill-group-star">★</span>}
                            {category}
                        </h3>
                        <div className="skill-pills">
                            {skills.map((skill) => (
                                <span className="pill" key={skill}>{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
