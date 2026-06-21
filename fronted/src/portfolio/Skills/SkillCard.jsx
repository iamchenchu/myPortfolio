import "./skill.css";

const skillsData = {
    "LLM Inference & Serving": [
        "vLLM", "TensorRT-LLM", "SGLang", "Triton Inference Server", "TGI",
        "Continuous / in-flight batching", "PagedAttention & KV-cache management",
        "Prefix caching", "Chunked prefill", "Speculative decoding",
        "Quantization (FP8 / INT8 / INT4, AWQ, GPTQ)", "Tensor & pipeline parallelism",
        "TTFT / inter-token latency / throughput / goodput", "p50-p99 latency SLOs",
        "Modal", "Ray Serve", "GPU profiling (Nsight)", "H100 / A100",
    ],
    "Agentic AI & LLM Systems": [
        "Multi-agent orchestration", "Planner / Executor / Validator", "LangGraph", "AutoGen",
        "LangChain", "LlamaIndex", "Tool / function calling", "RAG pipelines",
        "Hybrid retrieval (dense + sparse)", "Prompt & context engineering",
        "Guardrails & governance", "Microsoft Fabric semantic models",
    ],
    "LLMs & Generative AI": [
        "Transformers (decoder / encoder)", "Fine-tuning (LoRA / QLoRA / PEFT)",
        "Multi-Head Latent Attention (MLA)", "GQA / MQA", "Long-context attention",
        "BERT & contrastive learning", "Hugging Face", "Ollama",
        "FAISS / ChromaDB / Pinecone", "Vector / semantic search", "LLM evaluation",
    ],
    "Deep Learning & Classic ML": [
        "PyTorch", "TensorFlow", "Keras", "CUDA", "CNNs / RNNs / LSTMs",
        "GANs / cGAN / U-Net", "Computer Vision (YOLOv5, ResNet, OpenCV)",
        "Liquid Neural Networks (Neural ODE, CTRNN)", "Reinforcement Learning (DQN, DDPG)",
        "Time-series (ARIMA, Prophet, LSTM)", "Scikit-learn", "XGBoost / Gradient Boosting",
    ],
    "MLOps, LLMOps & Data": [
        "LangSmith (tracing / eval)", "Prompt & version management", "Regression testing",
        "Observability & monitoring", "CI/CD", "Docker", "Kubernetes", "FastAPI / Flask",
        "AWS (ECS / EKS / SageMaker)", "GCP", "Azure", "Terraform", "Airflow", "Kubeflow", "MLflow",
        "Apache Spark / Kafka", "ElasticSearch / Annoy", "Databricks", "Snowflake / BigQuery",
        "High-Performance & Distributed Computing",
    ],
    "Programming Languages": [
        "Python", "C/C++", "CUDA", "Go", "Rust", "Java", "Scala", "JavaScript / React", "SQL", "R",
    ],
};

export default function SkillCard() {
    return (
        <div className="skills-container">
            <p className="section-kicker">stack</p>
            <h2 className="section-title">Technical Skills</h2>

            <div className="skills-groups">
                {Object.entries(skillsData).map(([category, skills], index) => (
                    <div
                        className={`skill-group${index === 0 ? " skill-group--feature" : ""}`}
                        key={category}
                    >
                        <h3 className="skill-group-title">{category}</h3>
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
