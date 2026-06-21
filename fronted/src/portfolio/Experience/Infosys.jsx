import "./Exp.css";

export default function Infosys() {
  const details = [
    "Building production AI agents and agentic RAG for a banking client: orchestrating multi-agent workflows and serving them on Red Hat OpenShift, while migrating the stack from LangChain/LangGraph to Google's Agent Development Kit (ADK) for a cleaner, more governable agent runtime.",
    "Architected a governed Planner / Executor / Validator multi-agent system (LangGraph + AutoGen) over Microsoft Fabric semantic models, turning natural-language questions into validated, policy-compliant insights with hybrid (dense + sparse) retrieval to stay accurate within tight latency budgets.",
    "Led a GenAI RAG catalog-search system for NAPA Online (800K+ auto-part SKUs): fine-tuned LLaMA-2 embeddings + FAISS per-category indexes + LangChain retrieval on SageMaker, provisioned with Terraform - cut redundant 'catalog entropy' by 45% and lifted converting sessions 30%.",
    "Built the computer-vision pipeline for a Walmart frictionless-checkout POC: real-time YOLOv8 detection on Azure AKS with Kafka + Cosmos DB at 120-150 ms/inference - 96.3% cart accuracy and ~80% faster checkout (4.5 min to under 50 s).",
    "Instrumented every agent and pipeline with LangSmith tracing, evaluation, and regression tests, plus CI/CD and monitoring (MLOps + LLMOps), so multi-agent GenAI systems ship and run reliably in production.",
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
