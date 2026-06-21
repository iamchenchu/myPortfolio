import "./Exp.css";

export default function Infosys() {
  const details = [
    "Architected a governed Planner-Executor-Validator multi-agent system (LangGraph + AutoGen) for enterprise analytics over Microsoft Fabric semantic models, turning natural-language questions into validated, governed insights.",
    "Built modular LLM pipelines with LangChain for tool-calling, RAG, and prompt orchestration, grounding outputs in trusted enterprise data to cut hallucinations.",
    "Implemented hybrid retrieval (dense + sparse) to keep answers accurate while holding tight latency budgets.",
    "Established LangSmith-based tracing and evaluation for prompt/version management and workflow regression testing across releases.",
    "Applied MLOps + LLMOps practices - CI/CD, monitoring, and continuous optimization - to run multi-agent GenAI systems reliably in production.",
  ];

  return (
    <div className="experience-card">
      <div className="experience-header">
        <div className="experience-meta">
          <h3>AI/ML Engineer</h3>
          <div className="flex">
            <h4>Infosys</h4>
          </div>
        </div>
        <div className="experience-title">
          <p className="location">Austin, Texas, USA</p>
          <p className="year">Jul 2025 - Present</p>
        </div>
      </div>
      <ul>
        {details.map((detail, idx) => (
          <li key={idx}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}
